async function processFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload!');
        return;
    }

    if (!(file.name.endsWith('.json') || file.name.endsWith('.mcfunction'))) {
        alert('Please upload a valid .json or .mcfunction file!');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContent = event.target.result;
        
        try {
            // Detect file type and process accordingly
            let convertedContent;
            if (file.name.endsWith('.json')) {
                convertedContent = convertJson(fileContent);
            } else if (file.name.endsWith('.mcfunction')) {
                convertedContent = convertMcFunction(fileContent);
            }
            
            document.getElementById('responseMessage').innerText = 
                'Conversion Successful! Here is the result:\n' + convertedContent;

        } catch (error) {
            console.error('Error during file processing:', error);
            alert('An error occurred during conversion. Please check the file format.');
        }
    };

    reader.readAsText(file);
}

function convertJson(jsonContent) {
    const javaData = JSON.parse(jsonContent);
    const bedrockData = {};
    
    for (const key in javaData) {
        bedrockData[key.replace('criteria', 'goals').replace('trigger', 'event')] = javaData[key];
    }

    return JSON.stringify(bedrockData, null, 2);
}

function convertMcFunction(mcfunctionContent) {
    const mappings = {
        "execute as": "execute @",
        "if score": "if entity",
        // Add more mappings here...
    };

    let convertedContent = mcfunctionContent;
    for (const java in mappings) {
        convertedContent = convertedContent.replace(new RegExp(java, 'g'), mappings[java]);
    }

    return convertedContent;
}
