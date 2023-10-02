// Load saved entries from local storage if available
let savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) ?? [];

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

// Function to delete an entry and update the list
function deleteEntry(index) {
    savedEntries.splice(index, 1); // Remove the entry at the specified index
    localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));
    displayEntries();
}

// Function to edit an entry
function editEntry(index) {
    const entryText = document.getElementById('entry');
    entryText.value = savedEntries[index].text; // Set the textarea value to the selected entry text
    document.getElementById('saveButton').innerHTML = 'Update Entry'; // Change the button text to "Update Entry"
    // Attach an event listener to the button to update the entry when clicked
    document.getElementById('saveButton').removeEventListener('click', saveEntry);
    document.getElementById('saveButton').addEventListener('click', () => updateEntry(index));
}

// Function to update an entry
function updateEntry(index) {
    const entryText = document.getElementById('entry').value;
    if (entryText.trim() !== '') {
        savedEntries[index].text = entryText; // Update the text of the selected entry
        localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));
        displayEntries();
        document.getElementById('entry').value = '';
        document.getElementById('saveButton').innerHTML = 'Save Entry'; // Change the button text back to "Save Entry"
        // Reattach the saveEntry function to the button click event
        document.getElementById('saveButton').removeEventListener('click', updateEntry);
        document.getElementById('saveButton').addEventListener('click', saveEntry);
    }
}

// Function to display saved entries
function displayEntries() {
    const entryList = document.getElementById('entryList');
    entryList.innerHTML = '';
    savedEntries.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${entry.timestamp}</strong><br>${entry.text} <button class="edit-button" onclick="editEntry(${index})">Edit</button> <button class="delete-button" onclick="deleteEntry(${index})">Delete</button>`;
        entryList.appendChild(listItem);
    });
}

// Attach the saveEntry function to the button click event
document.getElementById('saveButton').addEventListener('click', saveEntry);

// Display saved entries on page load
displayEntries();
