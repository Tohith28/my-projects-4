// Load saved entries from local storage if available
let savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

// Function to save an entry and update the list
function saveEntry() {
    const entryText = document.getElementById('entry').value;
    if (entryText.trim() !== '') {
        const entry = {
            timestamp: new Date().toLocaleString(),
            text: entryText,
        };
        savedEntries.push(entry);
        localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));
        displayEntries();
        document.getElementById('entry').value = '';
    }
}

// Function to display saved entries
function displayEntries() {
    const entryList = document.getElementById('entryList');
    entryList.innerHTML = '';
    savedEntries.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${entry.timestamp}</strong><br>${entry.text}`;
        entryList.appendChild(listItem);
    });
}

// Attach the saveEntry function to the button click event
document.getElementById('saveButton').addEventListener('click', saveEntry);

// Display saved entries on page load
displayEntries();
