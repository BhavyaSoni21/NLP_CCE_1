/* ============================================================
   data.js — All content for the NLP Knowledge Repository
   ============================================================ */

// ============ SECTION A: CONCEPT CARDS ============
// Order: Text Preprocessing → Feature Engineering → Language Representation → Language Models

const CONCEPT_CARDS = [
  // --- TEXT PREPROCESSING ---
  {
    id: "sentence-segmentation", title: "Sentence Segmentation", category: "Text Preprocessing",
    difficulty: "Beginner", learningTime: "15 mins", contributor: "Bhavya Soni",
    definition: "Sentence Segmentation divides continuous text into individual sentences using punctuation, capitalization, and linguistic cues as boundary markers.",
    purpose: "Most NLP tasks operate at the sentence level. Segmenting text into sentences enables downstream processing like parsing, translation, and sentiment analysis to work on meaningful linguistic units.",
    workingPrinciple: "Rule-based segmenters use punctuation (. ! ?) and capitalization patterns to detect boundaries. Statistical and neural methods additionally consider abbreviations, decimals, and context to avoid false splits.",
    example: { input: "Dr. Smith went to New York. He arrived at 3 p.m.", output: ["Dr. Smith went to New York.", "He arrived at 3 p.m."] },
    advantages: ["Essential first step for sentence-level NLP", "Rule-based approaches are fast and transparent", "Neural segmenters achieve near-human accuracy"],
    limitations: ["Abbreviations (Dr., U.S.A.) cause false boundaries in naive systems", "Languages without punctuation need different strategies"],
    applications: ["Machine Translation", "Text Summarization", "Sentiment Analysis"],
    flowDiagram: ["Raw Text", "Boundary Detection", "Split at Boundaries", "Sentence List"],
    practicalUseCase: "Google Translate segments input into sentences before translating each one to preserve meaning and structure.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing", "Bird et al. (2009) - NLTK Book"],
    relatedConcepts: ["Tokenization", "Text Cleaning"]
  },
  {
    id: "tokenization", title: "Tokenization", category: "Text Preprocessing",
    difficulty: "Beginner", learningTime: "15 mins", contributor: "Bhavya Soni",
    definition: "Tokenization breaks text into smaller units called tokens (words, sub-words, or characters) that become the basic processing units for NLP.",
    purpose: "Raw text cannot be processed directly by NLP algorithms. Tokenization converts continuous text into discrete units that every downstream technique can operate on.",
    workingPrinciple: "A tokenizer scans text and splits at defined boundaries (whitespace, punctuation). Rule-based tokenizers use regex; sub-word tokenizers (BPE, WordPiece) learn optimal splits from data.",
    example: { input: "NLP is fun!", output: ["NLP", "is", "fun", "!"] },
    advantages: ["Simple to implement for most languages", "Every later technique depends on it", "Fast even on large corpora"],
    limitations: ["Word boundaries are language-dependent (Chinese has no spaces)", "Contractions and punctuation can cause incorrect splits by naive tokenizers"],
    applications: ["Search Engines", "Chatbots", "Sentiment Analysis"],
    flowDiagram: ["Raw Text", "Whitespace Splitting", "Punctuation Handling", "Token List"],
    practicalUseCase: "Elasticsearch tokenizes documents at index time to enable efficient full-text search queries.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing", "Hugging Face Tokenizers Documentation"],
    relatedConcepts: ["Sentence Segmentation", "Stop-word Removal"]
  },
  {
    id: "case-normalization", title: "Case Normalization", category: "Text Preprocessing",
    difficulty: "Beginner", learningTime: "10 mins", contributor: "Bhavya Soni",
    definition: "Case normalization converts all text to a uniform case (usually lowercase) so words like 'Apple', 'apple', and 'APPLE' are treated identically.",
    purpose: "Without normalization, the same word in different cases creates separate vocabulary entries, increasing sparsity and reducing the model's ability to generalize.",
    workingPrinciple: "A function maps every uppercase character to lowercase using Unicode case-folding rules. This is a single pass over the text.",
    example: { input: "Apple Inc. sells apples.", output: "apple inc. sells apples." },
    advantages: ["Reduces vocabulary size by 20-40%", "Zero computational cost", "Improves generalization for frequency-based models"],
    limitations: ["Can remove meaning (e.g., 'US' vs 'us')", "Not recommended when case carries semantic information (e.g., named entities)"],
    applications: ["Text Classification", "Information Retrieval", "Spam Detection"],
    flowDiagram: ["Input Text", "Lowercase Mapping", "Unicode Folding", "Normalized Text"],
    practicalUseCase: "Spam filters normalize all email text to lowercase before extracting features for classification.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing"],
    relatedConcepts: ["Text Cleaning", "Noise Removal"]
  },
  {
    id: "stopword-removal", title: "Stop-word Removal", category: "Text Preprocessing",
    difficulty: "Beginner", learningTime: "15 mins", contributor: "Bhavya Soni",
    definition: "Stop-word removal filters out common words (the, is, and, a) that occur frequently but carry little distinguishing meaning for most NLP tasks.",
    purpose: "Removing stop words reduces vocabulary size and noise, letting models focus on content-bearing words with discriminative information.",
    workingPrinciple: "Each token is compared against a predefined stop-word list. Matching tokens are removed before further processing.",
    example: { input: "The movie was very interesting and engaging", output: ["movie", "interesting", "engaging"] },
    advantages: ["Reduces feature space significantly, speeding up training", "Improves signal-to-noise ratio in BoW-style models"],
    limitations: ["Can remove meaning-bearing words like 'not' in sentiment analysis", "Stop-word lists are language- and domain-specific"],
    applications: ["Spam Detection", "Search Engines", "Text Classification"],
    flowDiagram: ["Token List", "Stop-word Dictionary Lookup", "Filter Matches", "Content Tokens"],
    practicalUseCase: "Search engines remove stop words from queries to focus on meaningful terms for retrieval.",
    references: ["Jurafsky & Martin (2023)", "NLTK Stopwords Corpus"],
    relatedConcepts: ["Tokenization", "Text Cleaning"]
  },
  {
    id: "stemming", title: "Stemming", category: "Text Preprocessing",
    difficulty: "Intermediate", learningTime: "20 mins", contributor: "Bhavya Soni",
    definition: "Stemming reduces words to their root form by stripping suffixes using fixed rules, without understanding grammar or context.",
    purpose: "Stemming reduces vocabulary by mapping different inflected forms to a single stem, helping models generalize across word forms.",
    workingPrinciple: "A rule-based algorithm (Porter Stemmer) applies suffix-stripping rules. No dictionary is used, so the result may not be a valid word.",
    example: { input: "Playing", output: "Play" },
    advantages: ["Very fast — simple string operations", "Easy to implement, no dictionary needed", "Effective for large-scale information retrieval"],
    limitations: ["Can produce non-dictionary words (e.g., 'studies' → 'studi')", "Prioritizes speed over linguistic accuracy"],
    applications: ["Information Retrieval", "Text Mining", "Search Indexing"],
    flowDiagram: ["Input Word", "Apply Suffix Rules", "Strip Affixes", "Stem"],
    practicalUseCase: "Lucene search indexes use stemming so searching for 'running' also matches 'run' and 'ran'.",
    references: ["Porter (1980) - An algorithm for suffix stripping", "Jurafsky & Martin (2023)"],
    relatedConcepts: ["Lemmatization", "Stop-word Removal"]
  },
  {
    id: "lemmatization", title: "Lemmatization", category: "Text Preprocessing",
    difficulty: "Intermediate", learningTime: "20 mins", contributor: "Mit Darji",
    definition: "Lemmatization converts words to their dictionary base form (lemma) by considering part of speech and meaning in context.",
    purpose: "Lemmatization normalizes words while preserving valid dictionary words, important for tasks where meaning must remain intact.",
    workingPrinciple: "A lemmatizer uses vocabulary and morphological analysis with POS tagging to map a word to its lemma. It knows 'better' → 'good' only when used as an adjective.",
    example: { input: "Running", output: "Run" },
    advantages: ["Produces linguistically valid, real words", "More accurate than stemming — accounts for context and POS"],
    limitations: ["Slower than stemming — requires dictionary lookups and POS tagging", "Needs language-specific linguistic resources"],
    applications: ["Chatbots", "Machine Translation", "Text Analysis"],
    flowDiagram: ["Input Word", "POS Tagging", "Dictionary Lookup", "Lemma"],
    practicalUseCase: "Chatbots use lemmatization to understand that 'ran', 'running', and 'runs' all refer to the action 'run'.",
    references: ["Jurafsky & Martin (2023)", "WordNet Documentation"],
    relatedConcepts: ["Stemming", "POS Tagging"]
  },
  {
    id: "noise-removal", title: "Noise Removal", category: "Text Preprocessing",
    difficulty: "Intermediate", learningTime: "15 mins", contributor: "Mit Darji",
    definition: "Noise removal strips irrelevant characters, HTML tags, URLs, special characters, and formatting artifacts from raw text.",
    purpose: "Real-world text contains HTML markup, URLs, emojis, and special characters that add noise and can confuse NLP models.",
    workingPrinciple: "Regular expressions identify known noise patterns (HTML tags, URLs, mentions, hashtags) and remove or replace them with placeholders.",
    example: { input: '<p>Hello! Check out https://example.com 😊</p>', output: 'Hello! Check out [URL]' },
    advantages: ["Significantly improves model accuracy by removing irrelevant patterns", "Reduces vocabulary size by eliminating unique URLs and markup"],
    limitations: ["Overly aggressive removal can discard meaningful content", "Noise patterns are domain-specific and require manual tuning"],
    applications: ["Social Media Analysis", "Web Scraping", "Email Processing"],
    flowDiagram: ["Raw Text", "Pattern Matching", "Remove/Replace Noise", "Clean Text"],
    practicalUseCase: "Twitter sentiment analysis pipelines strip hashtags, mentions, and URLs before processing tweets.",
    references: ["Bird et al. (2009) - Natural Language Processing with Python"],
    relatedConcepts: ["Text Cleaning", "Case Normalization"]
  },
  {
    id: "text-cleaning", title: "Text Cleaning", category: "Text Preprocessing",
    difficulty: "Beginner", learningTime: "15 mins", contributor: "Mit Darji",
    definition: "Text cleaning standardizes text by correcting typos, expanding contractions, handling Unicode, and fixing inconsistent formatting.",
    purpose: "Raw text from different sources uses different conventions. Cleaning ensures uniform input for downstream models regardless of source.",
    workingPrinciple: "A cleaning pipeline applies Unicode normalization, contraction expansion (don't → do not), whitespace standardization, and optional spelling correction.",
    example: { input: "I don't like the colour grey", output: "I do not like the color gray" },
    advantages: ["Reduces sparsity by standardizing variant forms", "Improves model robustness across different input sources"],
    limitations: ["Spelling correction can introduce errors", "Over-normalization can remove stylistic or regional variation"],
    applications: ["Data Preprocessing Pipelines", "Document Indexing", "OCR Correction"],
    flowDiagram: ["Raw Text", "Unicode Normalization", "Contraction Expansion", "Spelling Correction", "Clean Text"],
    practicalUseCase: "OCR output from scanned documents goes through extensive cleaning before being indexed for search.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing"],
    relatedConcepts: ["Noise Removal", "Case Normalization"]
  },

  // --- FEATURE ENGINEERING ---
  {
    id: "bag-of-words", title: "Bag of Words", category: "Feature Engineering",
    difficulty: "Beginner", learningTime: "20 mins", contributor: "Mit Darji",
    definition: "Bag of Words (BoW) represents a document as a collection of its word frequencies, completely ignoring grammar and word order.",
    purpose: "Machine learning models need numeric input. BoW converts variable-length text into fixed-length numeric vectors for comparison, clustering, or classification.",
    workingPrinciple: "A vocabulary of all unique words across documents is built. Each document becomes a vector where each position counts occurrences of that vocabulary word.",
    example: { input: "AI AI NLP", output: "Vocabulary: [AI, NLP] → Vector: [2, 1]" },
    advantages: ["Simple to understand and implement", "Works well as a baseline for text classification", "Fast to compute even on large datasets"],
    limitations: ["Ignores word order and context entirely", "Produces large, sparse vectors", "No semantic understanding — 'car' and 'automobile' are unrelated"],
    applications: ["Spam Detection", "Text Classification", "Topic Labeling"],
    flowDiagram: ["Document Collection", "Build Vocabulary", "Count Frequencies", "Vector Representation"],
    practicalUseCase: "Email spam classifiers use BoW features to distinguish spam from legitimate mail based on word frequencies.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing"],
    relatedConcepts: ["TF-IDF", "N-Grams"]
  },
  {
    id: "ngrams", title: "N-Grams", category: "Feature Engineering",
    difficulty: "Intermediate", learningTime: "20 mins", contributor: "Mit Darji",
    definition: "N-Grams are contiguous sequences of n items (words or characters) extracted from text, capturing local context and phrase-level patterns.",
    purpose: "Unigram BoW loses all word order. N-Grams capture short-range dependencies — 'not good' as a bigram preserves negation that unigrams miss.",
    workingPrinciple: "A sliding window of size n moves across text, extracting each contiguous n-item sequence. Common choices: bigrams (n=2) and trigrams (n=3).",
    example: { input: "not good", output: "Unigrams: [not, good], Bigrams: [not good]" },
    advantages: ["Captures local word order and phrase patterns", "Simple extension of BoW that improves accuracy", "Useful for language modeling"],
    limitations: ["Feature space explodes as n increases", "Cannot capture long-range dependencies beyond n tokens", "Most n-grams are rare, creating sparsity"],
    applications: ["Language Modeling", "Spelling Correction", "Text Classification"],
    flowDiagram: ["Tokenized Text", "Sliding Window (n)", "Extract Sequences", "N-Gram Features"],
    practicalUseCase: "Google's spelling correction system uses character n-grams to suggest corrections for misspelled queries.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing"],
    relatedConcepts: ["Bag of Words", "TF-IDF"]
  },
  {
    id: "tf", title: "Term Frequency (TF)", category: "Feature Engineering",
    difficulty: "Beginner", learningTime: "15 mins", contributor: "Mit Darji",
    definition: "Term Frequency measures how often a word appears in a document, typically normalized by document length to avoid bias toward longer documents.",
    purpose: "TF quantifies a term's importance within a single document, providing the baseline for more sophisticated weighting schemes like TF-IDF.",
    workingPrinciple: "Raw TF counts occurrences. Normalized TF divides by total words, giving a value between 0 and 1 representing the word's proportion in the document.",
    example: { input: "Document: 'AI AI NLP', TF(AI)=2/3, TF(NLP)=1/3", output: "TF(AI)=0.667, TF(NLP)=0.333" },
    advantages: ["Extremely simple and fast to compute", "Intuitively captures word prominence within a document"],
    limitations: ["Common words across all documents still get high scores", "No discrimination between important and generic frequent words"],
    applications: ["Document Similarity", "Keyword Extraction", "Text Summarization"],
    flowDiagram: ["Document", "Count Word Occurrences", "Divide by Total Words", "TF Scores"],
    practicalUseCase: "Text summarization systems use TF to identify the most prominent words in a document for extractive summaries.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing"],
    relatedConcepts: ["IDF", "TF-IDF"]
  },
  {
    id: "idf", title: "Inverse Document Frequency (IDF)", category: "Feature Engineering",
    difficulty: "Intermediate", learningTime: "15 mins", contributor: "Mit Darji",
    definition: "IDF measures how rare a word is across a document collection, calculated as log(N/df) where N is total documents and df is document frequency.",
    purpose: "IDF down-weights words common across many documents and up-weights distinctive ones, identifying vocabulary that characterizes specific documents.",
    workingPrinciple: "IDF = log(Total Documents / Documents Containing Term). Words in every document get IDF ≈ 0; rare words get high values.",
    example: { input: "Corpus of 100 docs; 'AI' appears in 10 → IDF = log(100/10) = 2.3", output: "IDF(AI) = 2.3" },
    advantages: ["Effectively identifies distinctive, rare words", "Simple and interpretable"],
    limitations: ["Sensitive to corpus composition — adding documents changes IDF", "Does not consider within-document frequency"],
    applications: ["Keyword Extraction", "Search Ranking", "Document Filtering"],
    flowDiagram: ["Corpus", "Count Docs per Term", "Apply IDF Formula", "IDF Scores"],
    practicalUseCase: "Search engines use IDF to down-weight common words so rare, query-specific terms drive ranking.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing"],
    relatedConcepts: ["TF", "TF-IDF"]
  },
  {
    id: "tfidf", title: "TF-IDF", category: "Feature Engineering",
    difficulty: "Intermediate", learningTime: "25 mins", contributor: "Mit Darji",
    definition: "TF-IDF measures how important a word is to a specific document within a collection by multiplying Term Frequency by Inverse Document Frequency.",
    purpose: "TF-IDF highlights distinctive words in a document while down-weighting words common across all documents, which BoW cannot do.",
    workingPrinciple: "TF measures within-document frequency. IDF measures across-corpus rarity. TF × IDF gives high scores for words frequent in one document but rare overall.",
    example: { input: "TF(AI)=0.667, IDF(AI)=2.3 → TF-IDF = 0.667 × 2.3", output: "TF-IDF(AI) = 1.53" },
    advantages: ["Better than BoW at identifying important words for a specific document", "Simple and computationally cheap compared to embedding methods"],
    limitations: ["Still ignores semantics — cannot tell 'car' and 'automobile' are related", "Sensitive to document collection size and composition"],
    applications: ["Search Engine Ranking", "Keyword Extraction", "Document Similarity"],
    flowDiagram: ["Document", "Compute TF", "Compute IDF", "TF × IDF", "TF-IDF Scores"],
    practicalUseCase: "Google Search uses a variant of TF-IDF to rank pages — pages where query terms have high TF-IDF scores rank higher.",
    references: ["Jurafsky & Martin (2023)", "Robertson & Zaragoza (2009) - BM25"],
    relatedConcepts: ["TF", "IDF", "Bag of Words"]
  },

  // --- LANGUAGE REPRESENTATION ---
  {
    id: "one-hot-encoding", title: "One-Hot Encoding", category: "Language Representation",
    difficulty: "Beginner", learningTime: "15 mins", contributor: "Mit Darji",
    definition: "One-Hot Encoding represents each word as a binary vector with a single 1 at its vocabulary index position and 0s everywhere else.",
    purpose: "It converts categorical word data into numeric format for ML algorithms — the simplest possible word representation.",
    workingPrinciple: "Build vocabulary of size V. Assign each word a unique index. Represent word as V-dimensional vector with 1 at its index and 0 elsewhere.",
    example: { input: "Vocabulary: [AI, NLP] → AI=[1,0], NLP=[0,1]", output: "Each word is a unique binary vector orthogonal to all others" },
    advantages: ["Extremely simple to implement and understand", "No training required — built directly from vocabulary"],
    limitations: ["Vectors grow linearly with vocabulary (very high-dimensional)", "Every pair of vectors is orthogonal — no semantic similarity", "Cannot represent out-of-vocabulary words"],
    applications: ["Simple Classifiers", "Baseline Models", "Categorical Features in ML"],
    flowDiagram: ["Vocabulary", "Assign Indices", "Create Binary Vectors", "One-Hot Vectors"],
    practicalUseCase: "Naive Bayes text classifiers often use one-hot encoded word presence as input features.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing"],
    relatedConcepts: ["Word Embeddings", "Bag of Words"]
  },
  {
    id: "word-embeddings", title: "Word Embeddings", category: "Language Representation",
    difficulty: "Intermediate", learningTime: "25 mins", contributor: "Mit Darji",
    definition: "Word embeddings are dense vector representations where semantically similar words have similar vectors in a continuous vector space.",
    purpose: "Unlike sparse one-hot vectors, embeddings capture semantic relationships and provide compact, dense representation for downstream tasks.",
    workingPrinciple: "A neural network trained on large corpora learns to predict a word from its context (CBOW) or context from a word (Skip-gram). Hidden layer weights become the embeddings.",
    example: { input: "Training on large corpus", output: "king≈[0.23,-0.12,0.45,...], queen≈[0.28,-0.08,0.50,...]" },
    advantages: ["Captures semantic and syntactic relationships between words", "Dense and low-dimensional (100-300 dim)", "Pre-trained embeddings enable transfer learning across tasks"],
    limitations: ["Requires large training corpus", "Static — each word has one vector regardless of context (polysemy problem)", "Computationally expensive to train from scratch"],
    applications: ["Semantic Similarity", "Named Entity Recognition", "Machine Translation"],
    flowDiagram: ["Large Corpus", "Neural Network Training", "Learn Weights", "Dense Vectors"],
    practicalUseCase: "Search engines use word embeddings for semantic search — matching 'automobile' queries to 'car' documents.",
    references: ["Mikolov et al. (2013) - Efficient Estimation of Word Representations", "Jurafsky & Martin (2023)"],
    relatedConcepts: ["Word2Vec", "FastText", "One-Hot Encoding"]
  },
  {
    id: "word2vec", title: "Word2Vec", category: "Language Representation",
    difficulty: "Intermediate", learningTime: "30 mins", contributor: "Mit Darji",
    definition: "Word2Vec is a neural technique from Google that produces word embeddings by learning word associations from large corpora using shallow neural networks.",
    purpose: "Word2Vec efficiently learns high-quality embeddings that capture semantic relationships, enabling vector arithmetic on words.",
    workingPrinciple: "Two architectures: CBOW predicts target word from context; Skip-gram predicts context from target word. Hidden layer weights become embedding vectors.",
    example: { input: "king - man + woman = ?", output: "king - man + woman ≈ queen" },
    advantages: ["High-quality embeddings with rich semantic relationships", "Efficient with negative sampling and hierarchical softmax", "Vector arithmetic captures analogies"],
    limitations: ["Each word has a single static vector — cannot handle polysemy", "Requires large training corpus", "Out-of-vocabulary words cannot be represented"],
    applications: ["Semantic Search", "Recommendation Systems", "Document Clustering"],
    flowDiagram: ["Corpus", "CBOW/Skip-gram Training", "Hidden Weights", "Embedding Matrix"],
    practicalUseCase: "Spotify uses Word2Vec for music recommendations by embedding song descriptions and user playlists.",
    references: ["Mikolov et al. (2013) - Efficient Estimation of Word Representations in Vector Space"],
    relatedConcepts: ["FastText", "Word Embeddings"]
  },
  {
    id: "fasttext", title: "FastText", category: "Language Representation",
    difficulty: "Advanced", learningTime: "30 mins", contributor: "Mit Darji",
    definition: "FastText extends Word2Vec by representing words as a combination of character n-grams, enabling embeddings for out-of-vocabulary and misspelled words.",
    purpose: "FastText addresses Word2Vec's OOV limitations using sub-word information, making it especially effective for morphologically rich languages.",
    workingPrinciple: "Each word is broken into character n-grams. The word vector is the sum of all its n-gram vectors plus an optional whole-word vector.",
    example: { input: "Word: 'apple', char 3-grams: 'app','ppl','ple'", output: "apple = v('app')+v('ppl')+v('ple')" },
    advantages: ["Handles out-of-vocabulary words by composing n-gram vectors", "Robust to misspellings and typos", "Works well on morphologically rich languages"],
    limitations: ["Larger model size than Word2Vec due to n-gram storage", "Slower training compared to Word2Vec", "Character n-gram approach can add noise for some tasks"],
    applications: ["Morphologically Rich Languages", "Spelling Correction", "Social Media Text Mining"],
    flowDiagram: ["Word", "Extract Character N-Grams", "Sum N-Gram Vectors", "Word Vector"],
    practicalUseCase: "Facebook uses FastText for language identification and content understanding across 100+ languages.",
    references: ["Bojanowski et al. (2017) - Enriching Word Vectors with Subword Information"],
    relatedConcepts: ["Word2Vec", "Word Embeddings"]
  },
  {
    id: "contextual-embeddings", title: "Contextual Embeddings", category: "Language Representation",
    difficulty: "Advanced", learningTime: "35 mins", contributor: "Mit Darji",
    definition: "Contextual embeddings give each word a vector that depends on its surrounding context, so the same word has different representations in different contexts.",
    purpose: "Static embeddings give identical vectors regardless of context. Contextual embeddings solve polysemy — 'bank' in 'river bank' vs 'savings bank' get different vectors.",
    workingPrinciple: "Deep neural networks (typically transformers) process sequences bidirectionally. Each word's representation is computed from attention-weighted relationships with all other words in the sentence.",
    example: { input: "'bank' in 'river bank' vs 'savings bank'", output: "Each occurrence gets a different embedding vector" },
    advantages: ["Handles polysemy — words get different vectors per context", "Captures long-range dependencies through attention mechanisms", "State-of-the-art across virtually all NLP benchmarks"],
    limitations: ["Computationally expensive — requires GPU for practical use", "Large models with millions to billions of parameters", "Cannot be used as simple lookup tables like static embeddings"],
    applications: ["Question Answering", "Named Entity Recognition", "Sentiment Analysis"],
    flowDiagram: ["Input Sentence", "Transformer Encoder", "Multi-Head Attention", "Contextual Vectors"],
    practicalUseCase: "BERT powers Google Search by understanding context-dependent meaning of queries for more relevant results.",
    references: ["Devlin et al. (2019) - BERT: Pre-training of Deep Bidirectional Transformers"],
    relatedConcepts: ["Word Embeddings", "Transformer-Based Representations"]
  },

  // --- LANGUAGE MODELS ---
  {
    id: "statistical-language-models", title: "Statistical Language Models", category: "Language Models",
    difficulty: "Intermediate", learningTime: "30 mins", contributor: "Bhavya Soni",
    definition: "Statistical Language Models are probability distributions over word sequences that estimate likelihood based on frequency counts from a training corpus.",
    purpose: "They assign probabilities to sentences, enabling speech recognition, machine translation, and text generation.",
    workingPrinciple: "N-gram models estimate P(w_n|w_{n-1},...,w_{n-N+1}) using Maximum Likelihood Estimation from corpus counts. Smoothing techniques (Laplace, Kneser-Ney) handle unseen n-grams.",
    example: { input: "P('I love NLP') = P(I)×P(love|I)×P(NLP|I love)", output: "A probability value between 0 and 1" },
    advantages: ["Simple and interpretable — probabilities come from observed counts", "Fast inference with efficient data structures"],
    limitations: ["Cannot capture long-range dependencies beyond n-gram window", "Sparsity — most possible n-grams never appear in training data", "No notion of word similarity or semantics"],
    applications: ["Speech Recognition", "Spelling Correction", "Machine Translation"],
    flowDiagram: ["Training Corpus", "Count N-Grams", "Apply Smoothing", "Probability Distribution"],
    practicalUseCase: "Your phone's keyboard uses a statistical language model to predict the next word as you type.",
    references: ["Jurafsky & Martin (2023) - Speech and Language Processing"],
    relatedConcepts: ["Neural Language Models", "N-Grams"]
  },
  {
    id: "neural-language-models", title: "Neural Language Models", category: "Language Models",
    difficulty: "Advanced", learningTime: "35 mins", contributor: "Bhavya Soni",
    definition: "Neural Language Models use neural networks to estimate word sequence probabilities, learning continuous representations that generalize beyond observed n-grams.",
    purpose: "They overcome the sparsity and generalization limitations of n-gram models by learning distributed representations that capture semantic and syntactic similarities.",
    workingPrinciple: "A neural network (RNN, LSTM, or transformer) encodes context into a hidden state and predicts the next word via softmax. Trained end-to-end on large corpora.",
    example: { input: "Context: 'I love ___'", output: "P(NLP)=0.15, P(coding)=0.12, P(you)=0.08" },
    advantages: ["Generalizes to unseen n-grams using word embeddings", "Captures long-range dependencies via recurrent or attention mechanisms", "Handles much larger context windows than n-gram models"],
    limitations: ["Computationally expensive to train and run inference", "Requires large amounts of training data and GPU resources", "Black-box nature makes interpretability difficult"],
    applications: ["Text Generation", "Machine Translation", "Speech Recognition"],
    flowDiagram: ["Context Words", "Embedding Layer", "Neural Encoder (RNN/Transformer)", "Softmax", "Word Probabilities"],
    practicalUseCase: "ChatGPT is built on a neural language model that predicts the next word billions of times during training.",
    references: ["Bengio et al. (2003) - A Neural Probabilistic Language Model"],
    relatedConcepts: ["Statistical Language Models", "Transformer-Based Representations"]
  },
  {
    id: "transformer-representations", title: "Transformer-Based Representations", category: "Language Models",
    difficulty: "Advanced", learningTime: "40 mins", contributor: "Bhavya Soni",
    definition: "Transformer-based representations use self-attention to process all sequence positions simultaneously, producing context-aware representations capturing relationships across the entire input.",
    purpose: "Transformers overcome RNN sequential processing limits, enabling parallel computation and better modeling of long-range dependencies through direct attention between all token pairs.",
    workingPrinciple: "Each token is embedded and augmented with positional encoding. Multi-head self-attention computes attention weights between all token pairs. Feed-forward layers and layer normalization process the results. Multiple layers stack for abstraction.",
    example: { input: "Sequence: 'The cat sat on the mat'", output: "Each token's representation encodes relationships to all other tokens" },
    advantages: ["Parallel computation — much faster training than RNNs", "Captures long-range dependencies via direct attention pathways", "Scalable — larger models consistently improve performance", "Enables transfer learning through pre-training and fine-tuning"],
    limitations: ["Quadratic attention cost O(n²) limits sequence length", "Requires massive amounts of training data and computation", "Model interpretability remains an active research challenge"],
    applications: ["Machine Translation", "Question Answering", "Text Generation", "Summarization"],
    flowDiagram: ["Input Tokens", "Embedding + Positional Encoding", "Multi-Head Self-Attention", "Feed-Forward", "Layer Norm", "Contextual Representations"],
    practicalUseCase: "BERT and GPT models power modern NLP applications from Google Search to ChatGPT, all built on the transformer architecture.",
    references: ["Vaswani et al. (2017) - Attention Is All You Need", "Devlin et al. (2019) - BERT"],
    relatedConcepts: ["Contextual Embeddings", "Neural Language Models"]
  }
];

// ============ SECTION B: COMPARATIVE ANALYSIS ============
const COMPARISONS = [
  {
    id: "stemming-vs-lemmatization", title: "Stemming vs Lemmatization", contributor: "Bhavya Soni",
    summary: "Stemming rapidly strips affixes using rules (fast but produces non-words). Lemmatization uses dictionaries and POS tags for linguistically valid results (slower but accurate).",
    rows: [
      { criterion: "Working Mechanism", left: "Rule-based suffix stripping (Porter Stemmer); no dictionary lookup. Applies heuristic rules to chop off affixes.", right: "Uses dictionary + part-of-speech context to find correct base form. Considers word's role in sentence." },
      { criterion: "Computational Complexity", left: "O(n) per word — simple string operations in microseconds. Ideal for real-time large corpus processing.", right: "O(n+POS) — requires dictionary lookups and POS tagging. 5-10x slower per word." },
      { criterion: "Strengths", left: "Fast, lightweight, good for speed-sensitive tasks like search indexing.", right: "Linguistically accurate, always outputs valid dictionary words." },
      { criterion: "Weaknesses", left: "Produces non-dictionary words ('studies'→'studi'). Cannot handle irregular forms.", right: "Slower, needs linguistic resources. Fails on unknown words." },
      { criterion: "Suitable Applications", left: "Search indexing, large-scale text mining, information retrieval.", right: "Chatbots, machine translation, question answering — tasks where correct meaning matters." }
    ],
    conclusion: "Stemming favors speed at the cost of accuracy; lemmatization favors accuracy at the cost of speed. Choose based on whether the task prioritizes throughput or precision."
  },
  {
    id: "tf-vs-tfidf", title: "TF vs TF-IDF", contributor: "Bhavya Soni",
    summary: "TF counts word frequency per document. TF-IDF adds cross-document weighting to highlight distinctive words while down-weighting generically common ones.",
    rows: [
      { criterion: "Working Mechanism", left: "Simple count or normalized proportion of word occurrences per document. Does not consider other documents.", right: "Multiplies TF by IDF, down-weighting words common across many documents and up-weighting document-specific ones." },
      { criterion: "Computational Complexity", left: "Very low — O(n) single pass per document.", right: "Moderate — O(n) per doc + O(V×D) across corpus for IDF computation." },
      { criterion: "Strengths", left: "Extremely simple and fast. Intuitive measure of word prominence within a document.", right: "Distinguishes genuinely important words from generically common ones. Better for ranking." },
      { criterion: "Weaknesses", left: "Cannot distinguish important words from common ones. High-frequency words dominate regardless.", right: "Still ignores semantics and word order. Cannot capture synonymy." },
      { criterion: "Suitable Applications", left: "Quick word-frequency analysis, simple document similarity, educational demonstrations.", right: "Search ranking, keyword extraction, document similarity, text summarization." }
    ],
    conclusion: "TF alone treats every frequent word as important; TF-IDF corrects this by weighing against the whole collection, making it the preferred method for search and ranking tasks."
  },
  {
    id: "word2vec-vs-fasttext", title: "Word2Vec vs FastText", contributor: "Mit Darji",
    summary: "Word2Vec treats each word as an atomic unit with one vector. FastText decomposes words into character n-grams for sub-word understanding and OOV handling.",
    rows: [
      { criterion: "Working Mechanism", left: "Shallow neural network (CBOW or Skip-gram). Each word is atomic with a single vector.", right: "Same architecture, but words are broken into character n-grams. Word vector = sum of n-gram vectors." },
      { criterion: "Computational Complexity", left: "Moderate — O(V×D) where V=vocabulary size. Scales with vocabulary.", right: "Higher — O(N×D) where N=number of char n-grams (3-10x vocabulary). Larger model size." },
      { criterion: "Strengths", left: "Rich semantic relationships (king−man+woman≈queen). Compact model. Well-understood.", right: "Handles OOV and misspelled words. Great for morphologically rich languages. More robust." },
      { criterion: "Weaknesses", left: "Cannot handle unseen words. Struggles with rare words. No sub-word info.", right: "Larger model size. Slower training. Noisier for some tasks." },
      { criterion: "Suitable Applications", left: "Semantic similarity, recommendation systems, general-purpose embeddings.", right: "Morphologically rich languages, social media text, spelling correction." }
    ],
    conclusion: "Word2Vec is a strong general-purpose method with compact models. FastText's sub-word approach trades model size for robustness, excelling with morphologically rich languages and noisy text."
  },
  {
    id: "statistical-vs-neural", title: "Statistical vs Neural Language Models", contributor: "Bhavya Soni",
    summary: "Statistical models count frequencies for probability estimation. Neural models learn continuous representations for better generalization and accuracy.",
    rows: [
      { criterion: "Working Mechanism", left: "Count n-gram frequencies from corpus and apply smoothing (Laplace, Kneser-Ney) to estimate probabilities.", right: "Neural networks (RNN, LSTM, Transformer) learn continuous representations. Predict next word via softmax." },
      { criterion: "Computational Complexity", left: "Low — O(V^n) storage. Fast training (single count pass). Inference is O(n) per word.", right: "High — O(L×H²) for transformers. Requires GPU training for practical use." },
      { criterion: "Strengths", left: "Simple, interpretable, fast to train and run. Works well with small datasets.", right: "Superior accuracy and generalization. Captures long-range dependencies. Scales with data." },
      { criterion: "Weaknesses", left: "Limited context window. Sparsity problem. No semantic understanding.", right: "Computationally expensive. Requires large data. Black-box — hard to interpret." },
      { criterion: "Suitable Applications", left: "Speech recognition (real-time), spelling correction, resource-constrained environments.", right: "Text generation, machine translation, question answering — where quality matters most." }
    ],
    conclusion: "Statistical models offer efficiency and interpretability at the cost of accuracy. Neural models deliver superior performance at higher computational cost."
  },
  {
    id: "onehot-vs-embeddings", title: "One-Hot Encoding vs Word Embeddings", contributor: "Mit Darji",
    summary: "One-Hot gives sparse orthogonal vectors (V-dimensional). Word embeddings give dense semantic vectors (100-300 dimensions) capturing relationships.",
    rows: [
      { criterion: "Working Mechanism", left: "Create vocabulary-sized vector per word. Set one position to 1, rest to 0. All vectors are orthogonal.", right: "Train neural networks to learn dense vectors where semantically similar words cluster together." },
      { criterion: "Computational Complexity", left: "O(V) per word — storage grows linearly with vocabulary. No training required.", right: "O(V×D) for training where D=100-300. Requires significant compute. O(1) inference lookup." },
      { criterion: "Strengths", left: "Extremely simple, no training needed, deterministic baseline. Easy to debug.", right: "Captures semantics. Dense and compact. Enables transfer learning. Handles synonymy." },
      { criterion: "Weaknesses", left: "Sparse and high-dimensional. No similarity measure between words.", right: "Requires training data and compute. Context-independent in static form." },
      { criterion: "Suitable Applications", left: "Simple classifiers, categorical features, educational demonstrations.", right: "Most modern NLP — sentiment analysis, NER, translation, semantic search." }
    ],
    conclusion: "One-Hot is a zero-cost baseline that discards all semantic information. Word embeddings provide dramatically richer representations, making them the default for modern NLP."
  }
];

// ============ SECTION C: WORKFLOW DIAGRAMS ============
const WORKFLOWS = [
  {
    id: "preprocessing-pipeline", title: "Complete Text Preprocessing Pipeline", contributor: "Bhavya Soni",
    image: "images/Text Preprocessing Pipeline.png", imageAlt: "Text Preprocessing Pipeline diagram",
    steps: [
      "Raw Text", "Sentence Segmentation", "Tokenization", "Case Normalization",
      "Noise Removal", "Stop-word Removal", "Stemming / Lemmatization", "Clean Text"
    ]
  },
  {
    id: "feature-engineering-pipeline", title: "Feature Engineering Pipeline", contributor: "Mit Darji",
    image: "images/Feature Engineering Pipeline.png", imageAlt: "Feature Engineering Pipeline diagram",
    steps: [
      "Clean Text", "Bag of Words", "N-Gram Extraction", "TF Computation",
      "IDF Computation", "TF-IDF Weighting", "Feature Vectors"
    ]
  },
  {
    id: "text-to-vector-pipeline", title: "Text-to-Vector Transformation Process", contributor: "Mit Darji",
    image: "images/Text-to-Vector Transformation Process.png", imageAlt: "Text-to-Vector Transformation diagram",
    steps: [
      "Input Text", "One-Hot Encoding", "Word Embeddings", "Word2Vec",
      "FastText", "Contextual Embeddings", "Transformer Encoding", "Output Vectors"
    ]
  }
];

// ============ SECTION D: REAL-WORLD APPLICATIONS ============
const APPLICATIONS = [
  {
    id: "search-engines", title: "Search Engines", contributor: "Bhavya Soni",
    overview: "Search engines process billions of queries daily, matching user intent to the most relevant content. NLP techniques form the foundation of how search engines understand, index, and rank content.",
    conceptsUsed: ["Tokenization", "Stop-word Removal", "TF-IDF", "Word Embeddings"],
    whyUsed: "Tokenization breaks queries and documents into indexable units. Stop-word removal focuses on meaningful terms. TF-IDF identifies documents with query-relevant vocabulary. Word embeddings enable semantic matching beyond exact keywords.",
    expectedBenefits: ["Faster and more relevant search results", "Semantic matching of related concepts", "Handling of typos and morphological variants", "Efficient indexing at billion-document scale"],
    architectureDiagram: "User Query → Tokenizer → Stop-word Filter → TF-IDF Scorer → Embedding Matcher → Ranked Results",
    realIndustryExample: "Google Search processes 8.5+ billion queries daily using a pipeline of tokenization, BERT-based understanding, and TF-IDF-like ranking signals.",
    example: "When a user searches 'best budget laptops 2026', the engine tokenizes the query, removes stop words, and uses TF-IDF scoring across indexed pages to rank results."
  },
  {
    id: "chatbots", title: "Chatbots", contributor: "Mit Darji",
    overview: "Conversational agents interpret user messages and generate contextually appropriate responses for customer support, information retrieval, and task completion.",
    conceptsUsed: ["Tokenization", "Lemmatization", "Word Embeddings", "Contextual Embeddings"],
    whyUsed: "Tokenization parses messages. Lemmatization normalizes word forms. Embeddings match intent across different phrasings. Contextual embeddings enable nuanced understanding.",
    expectedBenefits: ["24/7 availability with consistent quality", "Better intent understanding across varied phrasings", "Scalable support without proportional cost increase", "Continuous improvement through interaction data"],
    architectureDiagram: "User Message → Tokenizer → Lemmatizer → Intent Classifier → Response Generator → Reply",
    realIndustryExample: "Zendesk's Answer Bot handles 30%+ of support tickets automatically using NLP for intent classification and article recommendation.",
    example: "A chatbot recognizes that 'I want to cancel my order' and 'cancel order please' express the same intent after tokenization and lemmatization."
  },
  {
    id: "sentiment-analysis", title: "Sentiment Analysis", contributor: "Mit Darji",
    overview: "Sentiment analysis automatically classifies text as positive, negative, or neutral, enabling organizations to gauge public opinion at massive scale.",
    conceptsUsed: ["Tokenization", "Stop-word Removal", "Bag of Words", "TF-IDF", "Word Embeddings"],
    whyUsed: "Tokenization breaks text into analyzable units. Careful stop-word handling preserves negations. BoW/TF-IDF provide baseline features. Embeddings capture nuanced sentiment.",
    expectedBenefits: ["Process millions of reviews and posts automatically", "Real-time identification of emerging issues", "Quantifiable sentiment metrics over time", "Competitive intelligence on brand perception"],
    architectureDiagram: "Text → Tokenizer → Feature Extractor → Sentiment Classifier → Positive/Neutral/Negative",
    realIndustryExample: "Amazon uses sentiment analysis on product reviews to identify defect complaints and generate automatic review summaries.",
    example: "An e-commerce platform analyzes thousands of reviews to detect a spike in negative sentiment about a specific product defect."
  },
  {
    id: "machine-translation", title: "Machine Translation", contributor: "Bhavya Soni",
    overview: "Machine translation converts text between languages while preserving meaning, tone, and grammar, breaking down language barriers for global communication.",
    conceptsUsed: ["Sentence Segmentation", "Tokenization", "Lemmatization", "Word Embeddings", "Transformer Models"],
    whyUsed: "Sentence segmentation isolates translatable units. Tokenization handles source structure. Embeddings capture cross-lingual semantics. Transformers process entire sentences contextually.",
    expectedBenefits: ["Real-time translation across 100+ languages", "Continuous quality improvement", "Cost-effective compared to human translation", "Preservation of meaning and tone, not just words"],
    architectureDiagram: "Source Text → Segmenter → Tokenizer → Transformer Encoder → Transformer Decoder → Target Text",
    realIndustryExample: "Google Translate supports 133 languages and processes 100+ billion words daily using transformer-based neural machine translation.",
    example: "A translation system converts 'kick the bucket' to the idiomatically correct equivalent, not a literal word-by-word translation."
  },
  {
    id: "text-summarization", title: "Text Summarization", contributor: "Mit Darji",
    overview: "Text summarization condenses long documents into shorter versions while retaining key information, saving readers time and enabling quick content understanding.",
    conceptsUsed: ["Sentence Segmentation", "Tokenization", "TF-IDF", "N-Grams", "Transformer Models"],
    whyUsed: "Sentence segmentation identifies units for extraction. TF-IDF scores sentence importance. N-Grams capture phrases. Transformers enable abstractive summarization generating new sentences.",
    expectedBenefits: ["Dramatic reduction in reading time", "Consistent summary quality", "Quick scanning of large document volumes", "Multilingual summarization support"],
    architectureDiagram: "Document → Segmenter → Sentence Scorer (TF-IDF) → Ranking → Extraction/Abstractive Model → Summary",
    realIndustryExample: "The Associated Press uses automated summarization to produce thousands of earnings reports and news briefs monthly.",
    example: "A news aggregator generates a three-line summary by scoring sentences with TF-IDF and selecting the highest-scoring ones."
  }
];

// ============ SECTION E: RESEARCH & INDUSTRY INSIGHTS ============
const RESEARCH_ITEMS = [
  {
    category: "Research Development", title: "Efficient Transformer Models: Distillation and Quantization", contributor: "Mit Darji",
    summary: "Knowledge distillation (training smaller student models from larger teachers), weight quantization (reducing from 32-bit to 8/4-bit), and sparse attention mechanisms reduce transformer costs by 60-90% with minimal accuracy loss, enabling deployment on consumer hardware.",
    importance: "Large models like GPT-4 require massive resources. Efficient variants democratize access to state-of-the-art NLP for edge devices and real-time applications.",
    advantages: ["60-90% model size reduction with minimal accuracy loss", "On-device deployment without cloud dependency", "Lower energy consumption and carbon footprint", "Faster inference for real-time applications"],
    futureScope: "Future work targets 1-bit models, neural architecture search, and hardware-software co-design for NLP accelerators.",
    references: "Sanh et al. (2020) - DistilBERT; Jiao et al. (2020) - TinyBERT",
    publicationDate: "2020-2024"
  },
  {
    category: "Research Development", title: "Multilingual and Cross-Lingual Language Models", contributor: "Mit Darji",
    summary: "Models like mBERT, XLM-R, and No Language Left Behind are trained across dozens of languages simultaneously, transferring knowledge from high-resource to low-resource languages via shared representations.",
    importance: "Only ~20 of 7,000+ languages have significant NLP resources. Multilingual models bridge this gap, enabling NLP for underserved communities and preserving linguistic diversity.",
    advantages: ["Single model serving hundreds of languages", "Zero-shot transfer — train on English, deploy on Hindi or Swahili", "Digital inclusion for low-resource language speakers", "Documentation of endangered languages"],
    futureScope: "Universal models covering 1,000+ languages, improved few-shot learning, and integration with speech for oral language communities.",
    references: "Conneau et al. (2020) - XLM-R; Costa-jussà et al. (2022) - No Language Left Behind",
    publicationDate: "2019-2023"
  },
  {
    category: "Industrial Application", title: "NLP-Powered Customer Support Automation", contributor: "Bhavya Soni",
    summary: "Companies deploy intent classification, entity extraction, sentiment monitoring, and retrieval-augmented generation (RAG) to automate 30-50% of customer support queries, reducing response times from hours to seconds.",
    importance: "Customer support costs businesses billions annually. NLP automation dramatically improves operational efficiency and customer satisfaction simultaneously.",
    advantages: ["50-70% reduction in per-ticket support cost", "Response time improvement from hours to milliseconds", "24/7 availability without staffing constraints", "Consistent quality across all interactions"],
    futureScope: "Voice-based support integration, emotion detection for empathetic responses, and proactive issue resolution before customer notices problems.",
    references: "Zendesk Benchmark Report (2024); Intercom AI Customer Service Report (2024)",
    publicationDate: "2022-2025"
  },
  {
    category: "Industrial Application", title: "Healthcare NLP for Clinical Document Analysis", contributor: "Bhavya Soni",
    summary: "Hospitals use NLP to extract structured information (diagnoses, medications, patient history) from unstructured clinical notes and radiology reports, improving record accuracy and supporting clinical decisions.",
    importance: "~80% of healthcare data is unstructured text. NLP enables automated processing of millions of patient records, driving better outcomes through data-driven medicine.",
    advantages: ["30-40% reduction in clinician documentation time", "Improved coding accuracy for billing and records", "Large-scale retrospective studies using existing data", "Real-time clinical decision support"],
    futureScope: "Multimodal models processing text, images (X-rays, MRIs), and genomic data for comprehensive diagnostics and personalized treatment.",
    references: "Lee et al. (2020) - BioBERT; Wang et al. (2020) - ClinicalBERT",
    publicationDate: "2019-2024"
  },
  {
    category: "Open-Source Framework", title: "Hugging Face Transformers Library", contributor: "Mit Darji",
    summary: "The most widely used open-source NLP library, providing pre-trained transformer models and a unified API for thousands of tasks. The model hub hosts 500,000+ models and 100,000+ datasets.",
    importance: "Dramatically lowers the barrier to state-of-the-art NLP. Researchers can download, fine-tune, and deploy models in a few lines of code, creating a vibrant ecosystem for innovation.",
    advantages: ["Single API for 100,000+ models across all architectures", "Framework-agnostic (PyTorch, TensorFlow, JAX)", "Active community with continuous updates", "Enterprise-ready with export, quantization, and deployment tools"],
    futureScope: "Expansion to multimodal models (text+image+audio), RLHF integration, and specialized alignment and safety evaluation tools.",
    references: "Hugging Face (2026). Transformers Documentation. https://huggingface.co/docs/transformers",
    publicationDate: "2019-2026"
  }
];

// ============ SUSTAINABILITY & SOCIETAL IMPACT ============
const SUSTAINABILITY_TEXT = `Natural Language Processing has a direct and growing role in supporting sustainable development, particularly by making information and services more accessible to people who have historically been left out of the digital economy.

Language accessibility is one of the clearest examples. Most digital content and services are built around a small number of high-resource languages, primarily English. NLP techniques such as multilingual embeddings and translation models allow information — from educational material to government notices — to be made available in regional and low-resource languages, closing a gap that would otherwise take decades to address manually. This directly supports SDG 10 by reducing inequalities in access to digital information.

In education, NLP-powered tools support automated grading, personalized learning assistants, and text simplification for learners with different reading levels or learning needs. Students in under-resourced schools who may not have access to individual tutoring can benefit from AI-powered educational support, contributing to SDG 4's goal of inclusive and equitable quality education.

Assistive technologies powered by NLP provide life-changing support for individuals with disabilities. Speech-to-text systems help deaf and hard-of-hearing individuals access spoken content. Text-to-speech systems assist visually impaired users. Grammar and writing assistants support individuals with learning disabilities like dyslexia. These technologies remove barriers that would otherwise exclude millions from education, employment, and civic participation.

Government and citizen services benefit through automated document processing, multilingual chatbots, and intelligent form-filling systems. Citizens can access public services in their native language without visiting an office in person, especially valuable in rural areas with limited government infrastructure. This supports SDG 16's goal of building effective and inclusive institutions.

In healthcare, NLP extracts meaningful information from clinical notes, helping doctors make faster, better-informed decisions. Voice-based assistants help patients with visual or motor impairments interact with health services independently, contributing to SDG 3.

Alongside these benefits, responsible AI practices must guide how NLP systems are built and deployed. Language models can inherit biases from training data. Building transparent repositories that explain how these techniques work supports fairness, privacy, and inclusivity as core design principles.

Ultimately, NLP's contribution to sustainability lies in reducing the friction between people and the information or services they need, particularly for populations that language and literacy barriers have historically excluded. When developed responsibly, NLP becomes a tool for inclusion, access, and empowerment.`;

const SDG_CARDS = [
  { code: "SDG 4", title: "Quality Education", note: "NLP-powered text simplification, automated tutoring, and personalized learning assistants extend quality education to underserved learners." },
  { code: "SDG 3", title: "Good Health & Well-Being", note: "Clinical NLP improves medical record accuracy and voice-based assistants help patients with disabilities access healthcare independently." },
  { code: "SDG 10", title: "Reduced Inequalities", note: "Multilingual NLP brings digital services to speakers of regional and low-resource languages, closing the digital divide." },
  { code: "SDG 16", title: "Peace, Justice & Strong Institutions", note: "NLP-powered citizen services improve access to government information and reduce administrative friction for all citizens." },
  { code: "SDG 9", title: "Industry, Innovation & Infrastructure", note: "NLP drives innovation in human-computer interaction, enabling voice-controlled systems and automated document processing." },
  { code: "SDG 17", title: "Partnerships for the Goals", note: "Open-source NLP frameworks and shared multilingual models foster global collaboration toward sustainable development." }
];

// ============ CONTRIBUTION MATRIX ============
const CONTRIBUTION_MATRIX = [
  { student: "Bhavya Soni",
    contribution: "Concept Cards: Sentence Segmentation, Tokenization, Case Normalization, Stop-word Removal, Stemming, Statistical Language Models, Neural Language Models, Transformer-Based Representations · Comparative Analysis: Stemming vs Lemmatization, TF vs TF-IDF, Statistical vs Neural LMs · Workflow: Text Preprocessing Pipeline · Applications: Search Engines, Machine Translation · Research: Healthcare NLP, Customer Support Automation · Sustainability Section · Reflection" },
  { student: "Mit Darji",
    contribution: "Concept Cards: Lemmatization, Bag of Words, N-Grams, TF, IDF, TF-IDF, One-Hot Encoding, Word Embeddings, Word2Vec, FastText, Contextual Embeddings · Comparative Analysis: Word2Vec vs FastText, One-Hot vs Word Embeddings · Workflows: Feature Engineering Pipeline, Text-to-Vector Pipeline · Applications: Chatbots, Sentiment Analysis, Text Summarization · Research: Efficient Transformers, Multilingual Models, Hugging Face · Reflection" },
  { student: "Joint",
    contribution: "Concept Cards: Noise Removal, Text Cleaning · Real-World Applications overview · Research & Industry Insights framework · Sustainability & Societal Impact · References compilation · UI/UX Design · Project architecture and documentation" }
];

// ============ REFLECTION NOTES ============
const REFLECTIONS = [
  { student: "Bhavya Soni", text: "Working on this NLP Knowledge Repository helped me gain a thorough understanding of text preprocessing techniques including Tokenization, Stop-word Removal, Stemming, and foundational concepts like Sentence Segmentation and Case Normalization. Researching these concepts and preparing detailed comparison tables improved my analytical thinking and technical writing. Creating the workflow diagram for the preprocessing pipeline helped me visualize how different preprocessing steps connect in real-world NLP systems. The sustainability section was particularly eye-opening — understanding how NLP can contribute to SDGs through language accessibility and assistive technologies showed me the broader societal impact of this field. This project enhanced my knowledge of NLP fundamentals while improving my teamwork and content organization skills." },
  { student: "Mit Darji", text: "Contributing to this project gave me a comprehensive understanding of key NLP concepts including Lemmatization, Bag of Words, TF-IDF, N-Grams, and the full spectrum of language representation techniques from One-Hot Encoding to contextual embeddings. Designing workflow diagrams and the comparative analysis sections helped me deeply understand the trade-offs between different NLP techniques. Working on the research section taught me about cutting-edge developments like efficient transformer models and multilingual NLP. I also learned the importance of collaboration and task division while working as a team. This project strengthened my understanding of NLP and encouraged me to continue learning about modern AI applications." }
];

// ============ REFERENCES (APA & IEEE) ============
const REFERENCES_APA = [
  "Bengio, Y., Ducharme, R., Vincent, P., & Janvin, C. (2003). A neural probabilistic language model. Journal of Machine Learning Research, 3, 1137–1155.",
  "Bird, S., Klein, E., & Loper, E. (2009). Natural language processing with Python. O'Reilly Media.",
  "Bojanowski, P., Grave, E., Joulin, A., & Mikolov, T. (2017). Enriching word vectors with subword information. Transactions of the ACL, 5, 135–146.",
  "Conneau, A., et al. (2020). Unsupervised cross-lingual representation learning at scale. Proceedings of ACL 2020.",
  "Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers. Proceedings of NAACL-HLT 2019.",
  "Jurafsky, D., & Martin, J. H. (2023). Speech and language processing (3rd ed. draft). Stanford University.",
  "Mikolov, T., Chen, K., Corrado, G., & Dean, J. (2013). Efficient estimation of word representations in vector space. arXiv:1301.3781.",
  "Porter, M. F. (1980). An algorithm for suffix stripping. Program, 14(3), 130–137.",
  "Robertson, S., & Zaragoza, H. (2009). The probabilistic relevance framework: BM25 and beyond. Foundations and Trends in IR, 3(4), 333–389.",
  "Sanh, V., Debut, L., Chaumond, J., & Wolf, T. (2020). DistilBERT, a distilled version of BERT. arXiv:1910.01108.",
  "Vaswani, A., et al. (2017). Attention is all you need. Advances in NIPS, 30.",
  "Wolf, T., et al. (2020). Transformers: State-of-the-art natural language processing. Proceedings of EMNLP 2020."
];

const REFERENCES_IEEE = [
  "Y. Bengio, R. Ducharme, P. Vincent, and C. Janvin, \"A neural probabilistic language model,\" JMLR, vol. 3, pp. 1137–1155, 2003.",
  "S. Bird, E. Klein, and E. Loper, Natural Language Processing with Python. O'Reilly Media, 2009.",
  "P. Bojanowski, E. Grave, A. Joulin, and T. Mikolov, \"Enriching word vectors with subword information,\" TACL, vol. 5, pp. 135–146, 2017.",
  "A. Conneau et al., \"Unsupervised cross-lingual representation learning at scale,\" in Proc. ACL, 2020.",
  "J. Devlin, M. W. Chang, K. Lee, and K. Toutanova, \"BERT: Pre-training of deep bidirectional transformers,\" in Proc. NAACL-HLT, 2019.",
  "D. Jurafsky and J. H. Martin, Speech and Language Processing, 3rd ed. Stanford University, 2023.",
  "T. Mikolov, K. Chen, G. Corrado, and J. Dean, \"Efficient estimation of word representations in vector space,\" arXiv:1301.3781, 2013.",
  "M. F. Porter, \"An algorithm for suffix stripping,\" Program, vol. 14, no. 3, pp. 130–137, 1980.",
  "S. Robertson and H. Zaragoza, \"The probabilistic relevance framework: BM25 and beyond,\" Foundations and Trends in IR, vol. 3, no. 4, pp. 333–389, 2009.",
  "V. Sanh, L. Debut, J. Chaumond, and T. Wolf, \"DistilBERT, a distilled version of BERT,\" arXiv:1910.01108, 2020.",
  "A. Vaswani et al., \"Attention is all you need,\" in Advances in NIPS, vol. 30, 2017.",
  "T. Wolf et al., \"Transformers: State-of-the-art natural language processing,\" in Proc. EMNLP, 2020."
];

const STUDENT_INFO = [
  { name: "Bhavya Soni", role: "Contributor", github: "#", email: "bhavya.soni24@sakec.ac.in" },
  { name: "Mit Darji", role: "Contributor", github: "#", email: "mit.darji24@sakrc.ac.in" }
];
