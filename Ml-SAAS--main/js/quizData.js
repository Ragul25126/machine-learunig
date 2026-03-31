// ── Quiz Data for All Pages ──
// Each key matches a page name. Each has a title and array of questions.

export const QUIZ_DATA = {

  foundations: {
    title: 'Foundations',
    questions: [
      {
        question: 'What is the relationship between AI, ML, and Deep Learning?',
        options: ['They are all the same thing', 'ML is the biggest category, AI is a subset', 'AI is the biggest category, ML is a subset, DL is a subset of ML', 'Deep Learning is the broadest term'],
        correct: 2,
        explanation: 'AI is the broadest field. ML is a subset of AI (learning from data). Deep Learning is a subset of ML (using neural networks with many layers).'
      },
      {
        question: 'In supervised learning, the model is given:',
        options: ['Only the input data with no labels', 'Input data AND the correct answers (labels)', 'Rewards for good behavior', 'Random data to find patterns in'],
        correct: 1,
        explanation: 'Supervised learning uses labeled data — the model sees both the inputs and the correct outputs, learning to map one to the other.'
      },
      {
        question: 'Which type of ML does Netflix use when it groups movies you might like?',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'None — it uses manual rules'],
        correct: 1,
        explanation: 'Recommendation engines often use unsupervised learning to find hidden patterns and group similar items without explicit labels.'
      }
    ]
  },

  dataBasics: {
    title: 'Data Basics',
    questions: [
      {
        question: 'What is a "feature" in machine learning?',
        options: ['The label/answer we want to predict', 'An input variable used to make predictions', 'The model\'s accuracy score', 'A type of neural network'],
        correct: 1,
        explanation: 'A feature is an input variable (like age, height, price) that the model uses to make predictions. The thing we predict is the "label" or "target."'
      },
      {
        question: 'Why do we split data into training and testing sets?',
        options: ['To save memory', 'To train two different models', 'To check if the model works on unseen data', 'Because we have too much data'],
        correct: 2,
        explanation: 'We hold out a test set the model never sees during training. This tells us how the model performs on new, unseen data — its real-world ability.'
      },
      {
        question: 'What is the typical train/test split ratio?',
        options: ['50/50', '80/20', '99/1', '10/90'],
        correct: 1,
        explanation: '80% training / 20% testing is the most common split. Enough data to learn from, and enough to evaluate on.'
      }
    ]
  },

  dataPreprocessing: {
    title: 'Data Preprocessing',
    questions: [
      {
        question: 'Why do we normalize/scale features?',
        options: ['To make the data smaller', 'So features with different ranges contribute equally', 'To remove outliers', 'To add more data points'],
        correct: 1,
        explanation: 'Without scaling, a feature like "salary" (1000-100000) would dominate over "age" (0-100). Normalization puts all features on the same scale.'
      },
      {
        question: 'What should you do with missing values in your dataset?',
        options: ['Ignore them and train anyway', 'Delete the entire dataset', 'Fill them with a reasonable value (mean, median) or remove those rows', 'Set them all to zero'],
        correct: 2,
        explanation: 'Common strategies: fill with the mean/median (imputation), or drop rows with missing values. The choice depends on how much data you have and why it\'s missing.'
      },
      {
        question: 'What is one-hot encoding used for?',
        options: ['Converting numbers to text', 'Converting categorical text data into numbers', 'Removing duplicate data', 'Speeding up training'],
        correct: 1,
        explanation: 'Models need numbers, not words. One-hot encoding converts categories (like "Red", "Blue", "Green") into binary columns (1 or 0 for each category).'
      }
    ]
  },

  modelEvaluation: {
    title: 'Model Evaluation',
    questions: [
      {
        question: 'What does "overfitting" mean?',
        options: ['The model is too simple', 'The model memorizes training data but fails on new data', 'The model trains too slowly', 'The dataset is too small'],
        correct: 1,
        explanation: 'Overfitting = the model learned the training data TOO well (including noise), so it performs poorly on new unseen data. It memorized instead of generalizing.'
      },
      {
        question: 'If a model has high training accuracy but low test accuracy, it is likely:',
        options: ['Underfitting', 'Overfitting', 'Perfectly trained', 'Not trained yet'],
        correct: 1,
        explanation: 'High training accuracy + low test accuracy = classic overfitting. The model learned the training data patterns but can\'t generalize.'
      },
      {
        question: 'What is cross-validation?',
        options: ['Training on all the data at once', 'Splitting data into multiple folds and training/testing on different combinations', 'Only testing on training data', 'Using two different models'],
        correct: 1,
        explanation: 'Cross-validation splits data into K folds, trains on K-1, tests on 1, and rotates. This gives a more reliable estimate of model performance.'
      }
    ]
  },

  basicMath: {
    title: 'Basic Mathematics',
    questions: [
      {
        question: 'What does the slope (m) in y = mx + b represent?',
        options: ['Where the line crosses the y-axis', 'How steep the line is — the rate of change', 'The total error', 'The learning rate'],
        correct: 1,
        explanation: 'The slope tells you how much y changes for each unit increase in x. A slope of 2 means "for every +1 in x, y increases by 2."'
      },
      {
        question: 'Why do we use the mean (average) in ML?',
        options: ['Because it sounds scientific', 'To summarize a dataset with a single representative number', 'To add noise to data', 'To normalize features'],
        correct: 1,
        explanation: 'The mean gives us a central value that represents the dataset. It\'s used in loss functions (MSE), normalization, and many algorithms.'
      },
      {
        question: 'What does a derivative (gradient) tell us?',
        options: ['The value of the function', 'The direction and rate of steepest change', 'The total error of the model', 'How many data points we have'],
        correct: 1,
        explanation: 'The gradient points in the direction of steepest increase. In ML, we use it to find the direction to decrease loss — hence "gradient DESCENT."'
      }
    ]
  },

  mlWorkflow: {
    title: 'Training Process',
    questions: [
      {
        question: 'What is the correct order of the ML training loop?',
        options: ['Predict → Initialize → Loss → Update', 'Initialize → Predict → Calculate Loss → Update Weights → Repeat', 'Update → Predict → Initialize → Loss', 'Loss → Predict → Update → Initialize'],
        correct: 1,
        explanation: 'The training loop: Initialize (random weights) → Predict (forward pass) → Calculate Loss (measure error) → Update Weights (gradient descent) → Repeat.'
      },
      {
        question: 'What is "loss" in machine learning?',
        options: ['How much data is missing', 'A measure of how wrong the model\'s predictions are', 'The learning rate', 'The number of training epochs'],
        correct: 1,
        explanation: 'Loss = the gap between what the model predicted and the actual answer. Lower loss = better model. Training aims to minimize this.'
      },
      {
        question: 'Why do we update weights?',
        options: ['To make the model run faster', 'To add more data', 'To reduce the loss and make predictions more accurate', 'To increase the learning rate'],
        correct: 2,
        explanation: 'Updating weights is how the model LEARNS. Each update nudges the weights in the direction that reduces the loss, making predictions more accurate.'
      }
    ]
  },

  lossFunction: {
    title: 'Loss Functions',
    questions: [
      {
        question: 'Why do we square the errors in Mean Squared Error (MSE)?',
        options: ['To make numbers bigger', 'So positive and negative errors don\'t cancel out, and big errors are penalized more', 'Because computers prefer squared numbers', 'To speed up training'],
        correct: 1,
        explanation: 'Squaring makes all errors positive AND penalizes large errors more than small ones. An error of 10 contributes 100, while an error of 2 contributes only 4.'
      },
      {
        question: 'If a model has a loss of 0, what does that mean?',
        options: ['The model is broken', 'The model\'s predictions perfectly match all actual values', 'The model hasn\'t been trained', 'The learning rate is too high'],
        correct: 1,
        explanation: 'Loss = 0 means every prediction equals the actual value. Perfect fit! (Though in practice, this might indicate overfitting.)'
      },
      {
        question: 'What is the goal of training a model?',
        options: ['Maximize the loss', 'Minimize the loss', 'Keep the loss constant', 'Ignore the loss'],
        correct: 1,
        explanation: 'Training = minimize the loss. Every epoch, the model adjusts its weights to make the loss smaller, which means better predictions.'
      }
    ]
  },

  gradientDescent: {
    title: 'Gradient Descent',
    questions: [
      {
        question: 'What does gradient descent do?',
        options: ['It increases the loss function', 'It finds the direction to move weights to minimize loss', 'It adds more training data', 'It removes features from the model'],
        correct: 1,
        explanation: 'Gradient descent calculates which direction to adjust the weights so the loss decreases. It\'s like walking downhill on a loss landscape.'
      },
      {
        question: 'What happens if the learning rate is too high?',
        options: ['Training is too slow', 'The model might overshoot and never converge', 'Nothing — higher is always better', 'The model underfits'],
        correct: 1,
        explanation: 'A high learning rate takes big steps, which can overshoot the minimum and bounce around wildly. The loss might even increase!'
      },
      {
        question: 'What is the learning rate?',
        options: ['How fast the computer processes data', 'The size of each step when updating weights', 'The number of training epochs', 'The accuracy of the model'],
        correct: 1,
        explanation: 'The learning rate (α) controls step size. Small α = tiny careful steps (slow but stable). Large α = big jumps (fast but risky).'
      }
    ]
  },

  linearRegression: {
    title: 'Linear Regression',
    questions: [
      {
        question: 'What does linear regression try to find?',
        options: ['Clusters in the data', 'The best straight line through the data points', 'The nearest neighbors', 'A decision boundary'],
        correct: 1,
        explanation: 'Linear regression finds the best-fit line (y = wx + b) that minimizes the total squared error between the line and the data points.'
      },
      {
        question: 'What does R² = 0.95 mean?',
        options: ['The model is 95% accurate', 'The model explains 95% of the variance in the data', 'There are 95 data points', 'The loss is 0.95'],
        correct: 1,
        explanation: 'R² measures how well the line explains the data\'s variance. R²=0.95 means 95% of the variation in y is explained by x. R²=1 is perfect.'
      },
      {
        question: 'In y = wx + b, what is "b"?',
        options: ['The slope of the line', 'The y-intercept — where the line crosses the y-axis', 'The learning rate', 'The number of features'],
        correct: 1,
        explanation: 'b is the bias/intercept — the value of y when x = 0. It shifts the entire line up or down.'
      }
    ]
  },

  logisticRegression: {
    title: 'Logistic Regression',
    questions: [
      {
        question: 'What type of problem does logistic regression solve?',
        options: ['Regression (predicting numbers)', 'Classification (predicting categories)', 'Clustering', 'Dimensionality reduction'],
        correct: 1,
        explanation: 'Despite its name, logistic regression is a CLASSIFICATION algorithm. It predicts probabilities that map to categories (e.g., spam vs not spam).'
      },
      {
        question: 'What does the sigmoid function output?',
        options: ['Any number from -∞ to +∞', 'A value between 0 and 1 (a probability)', 'Only 0 or 1', 'A negative number'],
        correct: 1,
        explanation: 'The sigmoid function squishes any input into the range [0, 1], making it perfect for representing probabilities.'
      },
      {
        question: 'If the sigmoid outputs 0.85 for a spam detection model, it means:',
        options: ['85% of emails are spam', 'The model is 85% confident this email is spam', 'The loss is 0.85', 'There are 85 spam emails'],
        correct: 1,
        explanation: 'Output of 0.85 = 85% probability that this email is spam. We typically use 0.5 as the threshold: above = spam, below = not spam.'
      }
    ]
  },

  knn: {
    title: 'K-Nearest Neighbors',
    questions: [
      {
        question: 'How does KNN classify a new data point?',
        options: ['It draws a line through the data', 'It looks at the K closest points and takes a majority vote', 'It uses gradient descent', 'It randomly assigns a class'],
        correct: 1,
        explanation: 'KNN finds the K nearest neighbors to the new point and lets them vote. The class with the most votes wins.'
      },
      {
        question: 'Why should K be an odd number?',
        options: ['Odd numbers are luckier', 'To avoid ties in the voting', 'Because the algorithm requires it', 'To speed up computation'],
        correct: 1,
        explanation: 'With an even K (like 4), you could get a 2-2 tie between classes. Odd K ensures there\'s always a clear majority.'
      },
      {
        question: 'What happens when K is very large (e.g., K = 100)?',
        options: ['The model becomes more accurate', 'The decision boundary becomes too smooth and the model underfits', 'Training becomes faster', 'The model overfits'],
        correct: 1,
        explanation: 'Large K = very smooth boundaries. The model averages too many neighbors and loses the ability to capture local patterns (underfitting).'
      }
    ]
  },

  modelMetrics: {
    title: 'Model Metrics',
    questions: [
      {
        question: 'What is a "false positive"?',
        options: ['Correctly predicting positive', 'Predicting positive when the actual is negative', 'Predicting negative when the actual is positive', 'Correctly predicting negative'],
        correct: 1,
        explanation: 'False positive = the model says YES but the real answer is NO. Like a spam filter marking a real email as spam.'
      },
      {
        question: 'When is recall more important than precision?',
        options: ['When we want to minimize false alarms', 'When missing a positive case is very costly (e.g., cancer detection)', 'When accuracy is high enough', 'When the dataset is balanced'],
        correct: 1,
        explanation: 'In medical tests, missing a sick patient (false negative) is much worse than a false alarm (false positive). So we prioritize recall.'
      },
      {
        question: 'What does accuracy of 90% mean?',
        options: ['The model is wrong 90% of the time', '90 out of 100 predictions were correct', 'The loss is 0.9', 'The model has 90 features'],
        correct: 1,
        explanation: 'Accuracy = (correct predictions / total predictions). 90% accuracy means 90 out of 100 predictions matched the actual values.'
      }
    ]
  },

  kMeans: {
    title: 'K-Means Clustering',
    questions: [
      {
        question: 'What type of learning is K-Means?',
        options: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Semi-supervised learning'],
        correct: 1,
        explanation: 'K-Means is unsupervised — it finds clusters in data WITHOUT any labels. It discovers hidden groups on its own.'
      },
      {
        question: 'What does the "K" in K-Means represent?',
        options: ['The number of features', 'The number of clusters to create', 'The number of data points', 'The learning rate'],
        correct: 1,
        explanation: 'K is the number of clusters you want the algorithm to find. You choose K before running the algorithm.'
      },
      {
        question: 'How does K-Means assign points to clusters?',
        options: ['Randomly', 'By assigning each point to the nearest centroid', 'By sorting the data', 'By using gradient descent'],
        correct: 1,
        explanation: 'Each point is assigned to the cluster whose centroid (center) is closest. Then centroids are recalculated, and this repeats until stable.'
      }
    ]
  },

  decisionTree: {
    title: 'Decision Trees',
    questions: [
      {
        question: 'How does a decision tree make predictions?',
        options: ['By finding the nearest neighbors', 'By asking a series of yes/no questions about the features', 'By fitting a straight line', 'By using gradient descent'],
        correct: 1,
        explanation: 'A decision tree splits data with a series of if/else questions. Like a flowchart: "Is age > 30? → Yes → Is income > 50k? → Yes → Approve loan."'
      },
      {
        question: 'What is the "root node" of a decision tree?',
        options: ['The final prediction', 'The very first split/question at the top', 'The deepest node', 'A random node'],
        correct: 1,
        explanation: 'The root node is the first question asked — the most important split that best separates the data into groups.'
      },
      {
        question: 'What happens if a decision tree is too deep?',
        options: ['It underfits', 'It overfits — memorizes training data noise', 'It runs out of data', 'It becomes a random forest'],
        correct: 1,
        explanation: 'Very deep trees create overly specific rules that fit the training data perfectly but fail on new data. We "prune" trees to prevent this.'
      }
    ]
  },

  neuralNetwork: {
    title: 'Neural Networks',
    questions: [
      {
        question: 'What is a "neuron" in a neural network?',
        options: ['A brain cell', 'A unit that takes inputs, applies weights, adds them up, and passes through an activation function', 'A type of dataset', 'A loss function'],
        correct: 1,
        explanation: 'A neuron receives inputs, multiplies each by a weight, sums them up, adds a bias, then passes through an activation function (like sigmoid or ReLU).'
      },
      {
        question: 'Why do neural networks need activation functions?',
        options: ['To make the network faster', 'To introduce non-linearity so the network can learn complex patterns', 'To reduce the number of layers', 'They don\'t — they\'re optional'],
        correct: 1,
        explanation: 'Without activation functions, a neural network would just be a linear equation no matter how many layers. Activation functions let it learn curves, boundaries, and complex patterns.'
      },
      {
        question: 'What is "backpropagation"?',
        options: ['Training data flowing forward through the network', 'The algorithm that sends error signals backward to update all weights', 'Adding more layers to the network', 'Reversing the order of data'],
        correct: 1,
        explanation: 'Backpropagation calculates how much each weight contributed to the error, then adjusts them accordingly — working backwards from the output to the input layer.'
      }
    ]
  },

  svm: {
    title: 'Support Vector Machines',
    questions: [
      {
        question: 'What does SVM try to find?',
        options: ['The nearest neighbors', 'The best hyperplane that separates classes with maximum margin', 'Clusters in the data', 'A regression line'],
        correct: 1,
        explanation: 'SVM finds the optimal boundary (hyperplane) that separates classes with the widest possible margin — the biggest gap between the boundary and the nearest points.'
      },
      {
        question: 'What are "support vectors"?',
        options: ['All data points', 'The data points closest to the decision boundary', 'The center of each cluster', 'Outlier points'],
        correct: 1,
        explanation: 'Support vectors are the critical data points that sit right at the edge of the margin. They "support" the boundary — removing other points wouldn\'t change it.'
      },
      {
        question: 'What is the "kernel trick" in SVM?',
        options: ['A way to speed up training', 'A technique that maps data to a higher dimension so it becomes linearly separable', 'A way to reduce overfitting', 'A method to choose the best C value'],
        correct: 1,
        explanation: 'When data isn\'t linearly separable in 2D, the kernel trick projects it into a higher dimension where a straight boundary CAN separate the classes.'
      }
    ]
  }
};
