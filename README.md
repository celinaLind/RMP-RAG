# Rate My Professor w/ RAG

***Update README as we go with time taken, tasks done, resources used***

Using:
    - Miniconda
    - Node.js
    - Next.js
    - React.js

Allow users to find professors based on their names and ratings and allow them to add their own rating for their professor.


Resources:
(Miniconda Installer)[https://docs.anaconda.com/miniconda/#miniconda-latest-installer-links]

The code snippet metric="cosine", dimension=128 appears to be part of a configuration or initialization for a machine learning or data processing task, likely related to vector embeddings or similarity search. Here's a breakdown of what each part means:

metric="cosine"
Metric: This specifies the type of distance or similarity metric to be used.
Cosine: Cosine similarity is a measure of similarity between two non-zero vectors. It calculates the cosine of the angle between the vectors, which gives a value between -1 and 1. In the context of similarity search, a higher cosine similarity indicates that the vectors are more similar.
Formula: The cosine similarity between two vectors A and B is calculated as: [ \text{cosine_similarity}(A, B) = \frac{A \cdot B}{|A| |B|} ]
Use Case: Cosine similarity is commonly used in text analysis, recommendation systems, and clustering tasks where the magnitude of the vectors is less important than their direction.
dimension=128
Dimension: This specifies the number of features or components in the vectors being used.
128: This indicates that each vector has 128 dimensions or components.
Use Case: High-dimensional vectors are often used in machine learning models, especially in tasks involving embeddings such as word embeddings, image embeddings, or any other type of feature representation. A dimension of 128 is common in many pre-trained models and embeddings.
Example Context
This configuration might be used in a library or framework for tasks such as:

Vector Similarity Search: Finding similar vectors in a high-dimensional space.
Embedding Models: Using pre-trained embeddings with a fixed dimension.
Clustering: Grouping similar vectors together based on cosine similarity.


Backend Steps:
1. Install Miniconda
2. Set Path for conda
3. Initialize and activate conda env
    - `conda init`
    - `conda activate rag`
4. Install necessary programs by running the following:
    - `pip install python-dotenv`
    - `pip install "pinecone-client[grpc]"`
    - `pip install groq`
5. 

