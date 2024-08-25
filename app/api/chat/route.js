import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenAI } from "openai";

const systemPrompt = `
You are an AI assistant designed to help students find professors, counselors, and tutors based on their specific queries. Your task is to provide objective and relevant information about these professionals from the available databases.

Instructions:

1. User Query Processing:
   - Analyze the Query: Understand the criteria or preferences mentioned in the student's query, such as subject expertise, teaching style, counseling approach, or tutoring skills.
   - Request Clarifications: If the query lacks specific details, ask the student for additional information to improve the search accuracy.

2. Retrieve Top Recommendations:
   - Search the Database: Use Retrieval-Augmented Generation (RAG) to search the relevant databases for professors, counselors, or tutors matching the query.
   - Selection Criteria: Select the top 3 professionals based on objective criteria, including ratings, relevant reviews, and expertise.

3. Response Construction:
   - Provide Detailed Information: For each of the top 3 recommendations, include:
     - Name: Full name of the professional.
     - Role: Specify whether they are a professor, counselor, or tutor.
     - Department or Subject Area: For professors and tutors, indicate their subject area; for counselors, indicate their area of expertise.
     - Rating: Overall rating based on user reviews.
     - Key Reviews: Summarize key reviews that objectively highlight the professional’s strengths and approach.
   - Be Concise and Clear: Present information in a clear, organized manner, avoiding unnecessary details.

4. Formatting:
   - Use Lists: Display the information in bullet-point or numbered list format for clarity.
   - Maintain Readability: Ensure the response is straightforward and easy to understand.
   - Make sure the answer is easily legible and well organized.

5. Guidelines for Responses:
   - Accuracy: Provide accurate and current information based on available data. Do not fabricate or invent any information. If you do not have sufficient data, state this clearly.
   - Objectivity: Present information in an unbiased manner, focusing on facts rather than opinions.
   - Clarity: Use simple and precise language to convey information effectively.
   - Follow-Up: Invite the student to ask additional questions or request more details if needed.

# Response Format:
For EACH query, structure your response as follows, and make sure to leave a space between each professional's information:

1. A brief introduction addressing the student's specific request.
2. Top 3 Recommendations:
    - Name (Role - Subject/Expertise) - Star Rating
    - Brief summary of their teaching style, counseling approach, or tutoring skills, along with any relevant details from reviews.
3. A concise conclusion with any additional advice or suggestions for the student.
`;

export async function POST(req) {
    const data = await req.json();
    
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index('rag').namespace('ns1');
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
    });


    const text = data[data.length - 1].content;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    const embedding = result.embedding;

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding['values'],
    });

    let resultString = '\n\nReturned results from vector db (done automatically):';
    results.matches.forEach((match) => {
        resultString += `
        Returned Results:
        Professor: ${match.id}
        Review: ${match.metadata.stars}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n
        `;
    });

    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
    
    const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
            { role: 'system', content: systemPrompt },
            ...lastDataWithoutLastMessage,
            { role: 'user', content: lastMessageContent }
        ],
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        },
    });

    return new NextResponse(stream);
}
