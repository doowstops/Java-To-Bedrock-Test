async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload!');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('<BACKEND_API_URL>/upload', { // Replace <BACKEND_API_URL> with your backend's URL
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.status === 'success') {
            document.getElementById('responseMessage').innerText = 
                'Conversion Successful! Here is the result:\n' + JSON.stringify(result.data, null, 2);
        } else {
            document.getElementById('responseMessage').innerText = 
                'Error: ' + result.message;
        }
    } catch (error) {
        console.error('Error during upload:', error);
        document.getElementById('responseMessage').innerText = 
            'An error occurred. Please try again.';
    }
}
