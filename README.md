# Semantic and Fuzzy Search with Node.js and MongoDB Atlas

This project demonstrates the implementation of **semantic search** and **fuzzy search** using Node.js, backed by MongoDB Atlas. It leverages MongoDB's query capabilities to support text similarity and approximate string matching.

---

## What is the Difference Between Semantic and Fuzzy Search?

### **Semantic Search**
- **Definition**: Searches that focus on the meaning and context of the query. Results include documents that match the intent, even if they don't contain the exact query terms.
- **Use Case**: Ideal for natural language queries where context and relationships matter, such as "find documents about climate change" returning articles on global warming.

### **Fuzzy Search**
- **Definition**: Searches that handle misspellings, typos, or partial matches by looking for approximate matches to the query.
- **Use Case**: Useful when the user might input misspelled or incomplete terms, such as "googl" instead of "Google".

---

## Features

- **Semantic Search**: Context-aware searches using pre-trained embeddings.
- **Fuzzy Search**: Approximate matches powered by MongoDB Atlas Search's, allowing for misspellings or partial matches.
- **MongoDB Atlas Integration**: Scalable and secure database backend.

---

## Steps to Run the Project

### **1. Setup MongoDB Atlas**

1. **Create a MongoDB Atlas Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.

2. **Create a Cluster**
   - Build a cluster and configure your preferred cloud provider and region.

3. **Set Up a Database User**
   - Create a database user in **Database Access** with the permission to read and write to the database.

4. **Allow IP Address Access**
   - Add your IP in **Network Access**.

5. **Connect to the Cluster**
   - Copy your connection string from **Clusters > Connect > Connect Your Application**.

6. **Update `.env`**
   - Add the connection string:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase
     PORT=3000
     ```

---

### **2. Install Python and Dependencies**

1. Install Python (3.7 or later) from [Python's official website](https://www.python.org/).
2. Ensure Python is included in your system's PATH.
3. Install the required Python library by running:
   ```bash
   pip install sentence-transformers
   ```

---

### **3. Install Node.js Dependencies and Populate the Database**

1. Install the Node.js dependencies:
   ```bash
   npm install
   ```

2. Populate the database with data and generate embeddings:
   ```bash
   npm run populate-db
   ```

   This command will:
   - Populate the database.
   - Use Python to generate embedding vectors for the data and insert them into MongoDB.

---

### **4. Create Search Indexes in MongoDB Atlas**

#### **4.1 Create a Semantic Search Index**
1. Navigate to **Atlas Search** and select your data source.
2. Click **Create Search Index**.
3. Choose your database and collection.
4. Name the index (e.g., `semantic_search_index`).
5. Use the following JSON definition:
   ```json
   {
     "mappings": {
       "dynamic": false,
       "fields": {
         "vector": {
           "type": "knnVector",
           "dimensions": 384,
           "similarity": "cosine"
         },
         "text": {
           "type": "string"
         },
         "title": {
           "type": "string"
         }
       }
     }
   }
   ```

#### **4.2 Create a Fuzzy Search Index**

1. Navigate to **Atlas Search** and select your data source.
2. Click **Create Search Index**.
3. Choose your database and collection.
4. Name the index (e.g., `fuzzy_search_index`).
5. Use the following JSON definition:

   ```json
   {
     "mappings": {
       "dynamic": false,
       "fields": {
         "text": {
           "type": "string",
           "analyzer": "lucene.standard"
         },
         "title": {
           "type": "string",
           "analyzer": "lucene.standard"
         },
         "username": {
           "type": "string",
           "analyzer": "lucene.standard"
         }
       }
     }
   }

---

### **5. Run the Server**

Run the following command to start the application:
```bash
npm start
```

Access the Swagger API documentation and playground at:
```
http://localhost:{PORT}/api-docs/
```

---

### **6. Run the Showcase (Optional)**

To generate JSON files containing examples of semantic and fuzzy search results, run:
```bash
npm run showcase-search
```

This will save two JSON files with example searches for semantic and fuzzy search.

---

## Available Scripts

### **Run the Server**
Start the application server:
```bash
npm start
```

### **Populate the Database**
Populate the database with data and embeddings:
```bash
npm run populate-db
```

### **Run the Showcase**
Generate JSON files containing showcase examples:
```bash
npm run showcase-search
```

---

## Testing and Playground

- **Search Playground**: [MongoDB Search Playground](https://search-playground.mongodb.com/tools/code-playground/snapshots/664738af4e0a3f240a5de9d9?tck=as_pg_as_cta_hero_pg)

---

## Data Source
- Based on subset of the [Consumer Reviews of Amazon Products](https://www.kaggle.com/datasets/datafiniti/consumer-reviews-of-amazon-products)


## Project Overview

This project demonstrates:
- Leveraging MongoDB Atlas for **semantic** and **fuzzy search**.
- Using pre-trained models to generate vector embeddings for semantic search.
- Implementing robust search functionality in Node.js.
