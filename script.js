document.addEventListener('DOMContentLoaded', function() {
    // Hint counter
    let hintCount = 0;
    const hintCountElement = document.getElementById('hintCount');
    const finalHintCountElement = document.getElementById('finalHintCount');
    
    // Name variable for the first challenge
    const nameInput = document.getElementById('nameInput');
    const greetingExample = document.getElementById('greetingExample');
    const outputText = document.getElementById('outputText');
    const outputDisplay = document.querySelector('.output-display');
    
    // Number variable for the second challenge
    const numberInput = document.getElementById('numberInput');
    const oddEvenResult = document.getElementById('oddEvenResult');
    const outputText2 = document.getElementById('outputText2');
    const outputDisplay2 = document.getElementById('outputDisplay2');
    
    // Apply initial styling to name input
    nameInput.classList.add('name-placeholder');
    
    // Update greeting example when name changes
    nameInput.addEventListener('input', function() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameInput.value = 'Enter Name Here';
            nameInput.classList.add('name-placeholder');
            greetingExample.textContent = `Hello, Enter Name Here!`;
            outputText.textContent = `Hello, Enter Name Here!`;
        } else {
            if (name !== 'Enter Name Here') {
                nameInput.classList.remove('name-placeholder');
            }
            greetingExample.textContent = `Hello, ${name}!`;
            outputText.textContent = `Hello, ${name}!`;
        }
    });
    
    // Handle focus on name input
    nameInput.addEventListener('focus', function() {
        if (nameInput.value === 'Enter Name Here') {
            nameInput.value = '';
            nameInput.classList.remove('name-placeholder');
        }
    });
    
    // Handle blur on name input
    nameInput.addEventListener('blur', function() {
        if (nameInput.value.trim() === '') {
            nameInput.value = 'Enter Name Here';
            nameInput.classList.add('name-placeholder');
        }
    });
    
    // Update odd/even result when number changes
    numberInput.addEventListener('input', function() {
        const number = parseInt(numberInput.value) || 0;
        const result = number % 2 === 0 ? 'Even' : 'Odd';
        oddEvenResult.textContent = result;
        outputText2.textContent = result;
        
        // Update the print block text if it exists in the DOM
        const printBlock = document.querySelector('.code-block[data-order="6"]');
        if (printBlock) {
            // Get the div inside the code block if it exists
            const contentDiv = printBlock.querySelector('div');
            
            // Create new formatted text
            const newContent = `# Print the result\nresult = is_even(${number})\nprint(result)`;
            
            if (contentDiv) {
                // Clear existing content
                contentDiv.innerHTML = '';
                
                // Add new content with line breaks
                newContent.split('\n').forEach((line, index, array) => {
                    contentDiv.appendChild(document.createTextNode(line));
                    if (index < array.length - 1) {
                        contentDiv.appendChild(document.createElement('br'));
                    }
                });
            }
        }
    });
    
    // Challenge data
    const challenges = [
        {
            id: 1,
            blocks: [
                { text: 'def greet(name):', order: 1, explanation: 'This line defines a function named "greet" that takes one parameter called "name". The colon (:) indicates the start of the function body.' },
                { text: '    greeting = "Hello, " + name + "!"', order: 2, explanation: 'This line creates a variable called "greeting" and assigns it a value that combines the string "Hello, " with the name parameter and an exclamation mark. The + operator joins strings together.' },
                { text: '    print(greeting)', order: 3, explanation: 'This line prints the value of the "greeting" variable to the console. The print() function displays text to the user.' }
            ]
        },
        {
            id: 2,
            blocks: [
                { text: 'def is_even(n):', order: 1, explanation: 'This line defines a function named "is_even" that takes one parameter called "n". This parameter will be the number we want to check.' },
                { text: '    if n % 2 == 0:', order: 2, explanation: 'This line checks if n is divisible by 2 with no remainder. The % symbol is the modulo operator that gives the remainder after division. If n % 2 equals 0, then n is an even number.' },
                { text: '        return "Even"', order: 3, explanation: 'This line returns the string "Even" if the condition above is true (if n is divisible by 2). The indentation is important in Python to indicate this line belongs to the if statement.' },
                { text: '    else:', order: 4, explanation: 'This line indicates what to do if the condition in the if statement is false (if n is not divisible by 2). In Python, the "else" keyword must be aligned with the "if" statement it belongs to.' },
                { text: '        return "Odd"', order: 5, explanation: 'This line returns the string "Odd" if the number is not even. The indentation shows this line belongs to the else statement.' },
                { text: '# Print the result\nresult = is_even(42)\nprint(result)', order: 6, explanation: 'These lines show how to use the is_even() function. First, we call the function with a number and store the result in a variable. Then, we print that result to see it on the screen.' }
            ]
        }
    ];

    // Coding terms and definitions
    const codingTerms = {
        'def': {
            title: 'def - Function Definition',
            definition: 'In Python, the <code>def</code> keyword is used to define a function. It tells the computer that you\'re creating a reusable block of code that can be called (executed) later by name.',
            example: 'def say_hello():\n    print("Hello, world!")\n\n# Calling the function\nsay_hello()'
        },
        'variable': {
            title: 'Variables - Storing Information',
            definition: 'A variable is a named storage location that holds data in your program. Variables allow you to store and manipulate information throughout your code. You can think of variables like labeled containers that hold different types of data (text, numbers, etc.).',
            example: '# Creating variables\nname = "Maria"\nage = 15\nis_student = True\n\n# Using variables\nprint("Hello, " + name)\nprint("In 5 years, you will be", age + 5)'
        },
        'return': {
            title: 'return - Function Output',
            definition: 'The <code>return</code> statement is used to exit a function and send back a value to the code that called the function. Once a return statement is executed, the function stops running immediately.',
            example: 'def add_numbers(a, b):\n    sum = a + b\n    return sum\n\n# The returned value can be stored in a variable\nresult = add_numbers(5, 3)\nprint(result)  # Outputs: 8'
        },
        'print': {
            title: 'print() - Displaying Output',
            definition: 'The <code>print()</code> function in Python is used to display text or values to the screen or console. It\'s one of the most commonly used functions, especially when learning Python, as it allows you to see the results of your code.',
            example: '# Basic printing\nprint("Hello, world!")\n\n# Printing variables\nname = "Alex"\nprint("Hello, " + name)\n\n# Printing multiple items\nage = 16\nprint("Name:", name, "Age:", age)'
        },
        'if-else': {
            title: 'if/else Statements - Conditional Logic',
            definition: 'Conditional statements let your code make decisions. An <code>if</code> statement checks if a condition is true and runs specific code if it is. An <code>else</code> statement provides alternative code to run when the condition is false.',
            example: 'temperature = 75\n\nif temperature > 80:\n    print("It\'s hot outside!")\nelse:\n    print("It\'s not too hot today.")'
        },
        'indentation': {
            title: 'Indentation - Code Block Structure',
            definition: 'In Python, indentation (spaces at the beginning of a line) is crucial as it defines the structure of your code. It shows which lines belong to which code blocks like functions, loops, or conditional statements. Most languages use curly braces { } for this purpose, but Python uses indentation.',
            example: 'def check_number(x):\n    if x > 0:\n        print("Positive")\n        if x > 10:\n            print("And greater than 10")\n    else:\n        print("Non-positive")'
        },
        'modulo': {
            title: 'Modulo Operator (%) - Remainder Calculation',
            definition: 'The modulo operator (%) calculates the remainder of a division operation. It\'s commonly used to check if a number is divisible by another number with no remainder, which is useful for determining if numbers are even or odd.',
            example: '# Check if a number is even or odd\nnumber = 7\n\nif number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")\n\n# Using modulo to wrap around (e.g., clock time)\nhour = 13 % 12  # hour becomes 1'
        }
    };

    // Initialize challenges
    initializeChallenge(1);
    initializeChallenge(2);

    // Button event listeners
    document.getElementById('checkBtn1').addEventListener('click', () => checkAnswer(1));
    document.getElementById('checkBtn2').addEventListener('click', () => checkAnswer(2));
    document.getElementById('resetBtn1').addEventListener('click', () => resetChallenge(1));
    document.getElementById('resetBtn2').addEventListener('click', () => resetChallenge(2));
    document.getElementById('nextBtn1').addEventListener('click', () => showChallenge(2));
    document.getElementById('prevBtn2').addEventListener('click', () => showChallenge(1));
    document.getElementById('completeBtn').addEventListener('click', completeChallenge);
    document.getElementById('restartBtn').addEventListener('click', restartChallenges);

    // Set up term definition links
    document.querySelectorAll('.term-link').forEach(link => {
        link.addEventListener('click', function() {
            const term = this.getAttribute('data-term');
            showTermDefinition(term);
        });
    });

    // Initialize a challenge
    function initializeChallenge(challengeId) {
        const challenge = challenges.find(c => c.id === challengeId);
        const blockContainer = document.getElementById(`blockContainer${challengeId}`);
        const solutionContainer = document.getElementById(`solutionContainer${challengeId}`);

        // Clear containers
        blockContainer.innerHTML = '';
        solutionContainer.innerHTML = '';

        // Shuffle and add blocks to the block container
        const shuffledBlocks = [...challenge.blocks].sort(() => Math.random() - 0.5);
        
        shuffledBlocks.forEach(block => {
            const blockElement = createBlockElement(block);
            blockContainer.appendChild(blockElement);
        });

        // Initialize Sortable for both containers
        new Sortable(blockContainer, {
            group: `challenge${challengeId}`,
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen'
        });

        new Sortable(solutionContainer, {
            group: `challenge${challengeId}`,
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen'
        });
    }

    // Create a code block element
    function createBlockElement(block) {
        const blockElement = document.createElement('div');
        blockElement.className = 'code-block';
        blockElement.dataset.order = block.order;
        blockElement.dataset.explanation = block.explanation;
        
        // Handle newlines in text content properly
        if (block.text.includes('\n')) {
            // Replace newlines with <br> tags for proper display
            const formattedText = document.createElement('div');
            block.text.split('\n').forEach((line, index, array) => {
                formattedText.appendChild(document.createTextNode(line));
                if (index < array.length - 1) {
                    formattedText.appendChild(document.createElement('br'));
                }
            });
            blockElement.appendChild(formattedText);
        } else {
            // No newlines, just set text content
            blockElement.textContent = block.text;
        }
        
        // Add info icon
        const infoIcon = document.createElement('span');
        infoIcon.className = 'block-info';
        infoIcon.innerHTML = '<i class="far fa-question-circle"></i>';
        infoIcon.title = 'Click for explanation';
        infoIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            showBlockExplanation(block.text, block.explanation);
        });
        
        blockElement.appendChild(infoIcon);
        
        return blockElement;
    }

    // Show explanation for a single block
    function showBlockExplanation(blockText, explanation) {
        // Increment hint counter
        incrementHintCount();
        
        // Create a modal for the explanation
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'explanationModal';
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'explanationModalLabel');
        modal.setAttribute('aria-hidden', 'true');
        
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="explanationModalLabel">Code Explanation</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="code-snippet bg-light p-2 mb-3 rounded">
                            <code>${blockText}</code>
                        </div>
                        <p>${explanation}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show the modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Remove modal from DOM when hidden
        modal.addEventListener('hidden.bs.modal', function () {
            document.body.removeChild(modal);
        });
    }

    // Show definition for a coding term
    function showTermDefinition(term) {
        // Increment hint counter
        incrementHintCount();
        
        const termData = codingTerms[term];
        const termModal = document.getElementById('termModal');
        
        if (termData) {
            document.getElementById('termTitle').textContent = termData.title;
            document.getElementById('termDefinition').innerHTML = termData.definition;
            document.getElementById('termExample').textContent = termData.example;
            
            const bsModal = new bootstrap.Modal(termModal);
            bsModal.show();
        }
    }
    
    // Increment hint counter
    function incrementHintCount() {
        hintCount++;
        hintCountElement.textContent = hintCount;
        finalHintCountElement.textContent = hintCount;
    }

    // Check the user's answer
    function checkAnswer(challengeId) {
        const challenge = challenges.find(c => c.id === challengeId);
        const solutionContainer = document.getElementById(`solutionContainer${challengeId}`);
        const feedbackElement = document.getElementById(`feedback${challengeId}`);
        const explanationElement = document.getElementById(`explanation${challengeId}`);
        const nextButton = document.getElementById(`nextBtn${challengeId}`);
        
        // Get all blocks in the solution container
        const solutionBlocks = solutionContainer.querySelectorAll('.code-block');
        
        // Check if all blocks are in the solution container
        if (solutionBlocks.length !== challenge.blocks.length) {
            feedbackElement.className = 'feedback error';
            feedbackElement.textContent = 'Please place all code blocks in the solution area.';
            return;
        }
        
        // Check if the order is correct
        let isCorrect = true;
        let blocksWithStatus = [];
        
        solutionBlocks.forEach((block, index) => {
            const expectedOrder = index + 1;
            const actualOrder = parseInt(block.dataset.order);
            
            block.classList.remove('correct', 'incorrect');
            
            if (actualOrder === expectedOrder) {
                block.classList.add('correct');
                blocksWithStatus.push({
                    text: block.textContent,
                    explanation: block.dataset.explanation,
                    correct: true
                });
            } else {
                block.classList.add('incorrect');
                isCorrect = false;
                blocksWithStatus.push({
                    text: block.textContent,
                    explanation: block.dataset.explanation,
                    correct: false
                });
            }
        });
        
        // Display feedback
        if (isCorrect) {
            feedbackElement.className = 'feedback success';
            feedbackElement.textContent = 'Congratulations! Your solution is correct.';
            solutionContainer.classList.add('pulse');
            
            // Enable next button
            if (nextButton) {
                nextButton.disabled = false;
            }
            
            // Show full explanation
            displayExplanation(challengeId, blocksWithStatus);
            explanationElement.style.display = 'block';
            
            // Show the output display for the appropriate challenge
            if (challengeId === 1) {
                document.querySelector('.output-display').style.display = 'block';
            } else if (challengeId === 2) {
                document.getElementById('outputDisplay2').style.display = 'block';
            }
        } else {
            feedbackElement.className = 'feedback error';
            feedbackElement.textContent = 'Your solution is not quite right. Check the order of your blocks and try again.';
            explanationElement.style.display = 'none';
            
            // Hide output displays
            if (challengeId === 1) {
                document.querySelector('.output-display').style.display = 'none';
            } else if (challengeId === 2) {
                document.getElementById('outputDisplay2').style.display = 'none';
            }
        }
        
        // Remove pulse animation after it completes
        setTimeout(() => {
            solutionContainer.classList.remove('pulse');
        }, 500);
    }

    // Display the full explanation for the challenge
    function displayExplanation(challengeId, blocksWithStatus) {
        const explanationContent = document.querySelector(`#explanation${challengeId} .explanation-content`);
        explanationContent.innerHTML = '';
        
        blocksWithStatus.forEach(block => {
            const explanationItem = document.createElement('div');
            explanationItem.className = 'explanation-item';
            
            const codeElement = document.createElement('div');
            codeElement.className = 'code-snippet bg-light p-2 mb-2 rounded';
            codeElement.innerHTML = `<code>${block.text}</code>`;
            
            const explanationText = document.createElement('p');
            explanationText.textContent = block.explanation;
            
            explanationItem.appendChild(codeElement);
            explanationItem.appendChild(explanationText);
            explanationContent.appendChild(explanationItem);
        });
        
        // Add a simple explanation of the entire function
        const conclusionElement = document.createElement('div');
        conclusionElement.className = 'mt-3 pt-3 border-top';
        
        if (challengeId === 1) {
            conclusionElement.innerHTML = `
                <h5>Function Overview:</h5>
                <p>This <code>greet()</code> function takes a name as input and prints a personalized greeting. For example, if you call <code>greet("Maria")</code>, it will print <code>"Hello, Maria!"</code> to the console.</p>
                <p>The function demonstrates how to define a function, manipulate strings, and print output in Python.</p>
            `;
        } else if (challengeId === 2) {
            conclusionElement.innerHTML = `
                <h5>Function Overview:</h5>
                <p>This <code>is_even()</code> function determines if a number is even or odd. When you call <code>is_even(4)</code>, it returns <code>"Even"</code>, and when you call <code>is_even(7)</code>, it returns <code>"Odd"</code>.</p>
                <p>This function demonstrates conditional logic (if/else statements) and the modulo operator (%) which finds the remainder after division.</p>
                <p>Unlike the <code>greet()</code> function, this function returns a value instead of printing it directly. This allows the result to be stored in a variable first, which we can then print or use elsewhere in our code as shown in the example.</p>
            `;
        }
        
        explanationContent.appendChild(conclusionElement);
    }

    // Reset a challenge
    function resetChallenge(challengeId) {
        const feedbackElement = document.getElementById(`feedback${challengeId}`);
        const explanationElement = document.getElementById(`explanation${challengeId}`);
        const nextButton = document.getElementById(`nextBtn${challengeId}`);
        
        // Hide feedback and explanation
        feedbackElement.className = 'feedback';
        feedbackElement.textContent = '';
        explanationElement.style.display = 'none';
        
        // Hide output displays
        if (challengeId === 1) {
            document.querySelector('.output-display').style.display = 'none';
        } else if (challengeId === 2) {
            document.getElementById('outputDisplay2').style.display = 'none';
        }
        
        // Disable next button
        if (nextButton) {
            nextButton.disabled = true;
        }
        
        // Reinitialize the challenge
        initializeChallenge(challengeId);
    }

    // Show a specific challenge
    function showChallenge(challengeId) {
        // Hide all challenges
        document.querySelectorAll('.challenge').forEach(challenge => {
            challenge.classList.remove('active');
        });
        
        // Show the selected challenge
        document.getElementById(`challenge${challengeId}`).classList.add('active');
    }

    // Complete the challenges
    function completeChallenge() {
        // Update final hint count
        finalHintCountElement.textContent = hintCount;
        
        // Hide all challenges
        document.querySelectorAll('.challenge').forEach(challenge => {
            challenge.classList.remove('active');
        });
        
        // Show completion screen
        document.getElementById('completion').classList.add('active');
    }

    // Restart all challenges
    function restartChallenges() {
        // Reset hint count
        hintCount = 0;
        hintCountElement.textContent = hintCount;
        finalHintCountElement.textContent = hintCount;
        
        // Reset both challenges
        resetChallenge(1);
        resetChallenge(2);
        
        // Show the first challenge
        showChallenge(1);
    }
});