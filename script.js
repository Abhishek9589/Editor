// Initialize CodeMirror editors with line numbers enabled
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
    mode: 'xml',
    htmlMode: true,
    lineNumbers: true, // Enable line numbers
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
    mode: 'css',
    lineNumbers: true, // Enable line numbers
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
    mode: 'javascript',
    lineNumbers: true, // Enable line numbers
});

const previewFrame = document.getElementById('preview');
const downloadBtn = document.getElementById('download-btn');

function updatePreview() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = `<script>${jsEditor.getValue()}<\/script>`;
    
    previewFrame.srcdoc = htmlContent + cssContent + jsContent;
}

function downloadCode() {
    const zip = new JSZip();
    zip.file("index.html", htmlEditor.getValue());
    zip.file("styles.css", cssEditor.getValue());
    zip.file("script.js", jsEditor.getValue());

    zip.generateAsync({ type: "blob" }).then(function(content) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = "code.zip";
        document.body.appendChild(a); // Append anchor to the body
        a.click();
        document.body.removeChild(a); // Remove anchor from the body
    });
}

htmlEditor.on('change', updatePreview);
cssEditor.on('change', updatePreview);
jsEditor.on('change', updatePreview);

downloadBtn.addEventListener('click', downloadCode);

// Initialize with empty content
updatePreview();
