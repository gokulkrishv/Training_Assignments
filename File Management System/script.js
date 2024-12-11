
class FileManager {
    constructor() {
      this.files = []; 
    }
  
    createFile() {
      const fileName = document.getElementById("file-name").value.trim();
      const fileContent = document.getElementById("file-content").value.trim();
  
      if (!fileName) {
        alert("File name cannot be empty.");
        return;
      }
  
      try {
        this.files.push({ name: fileName, content: fileContent });
        alert(`File "${fileName}" created successfully.`);
        this.clearInputs();
      } catch (error) {
        alert("Error creating file: " + error.message);
      }
    }
  
    async uploadFile(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];
  
      if (!file) {
        alert("No file selected.");
        return;
      }
  
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.files.push({ name: file.name, content: fileReader.result });
        alert(`File "${file.name}" uploaded successfully.`);
      };
      fileReader.onerror = () => {
        alert("Error uploading file.");
      };
  
      try {
        fileReader.readAsText(file);
      } catch (error) {
        alert("Error reading file: " + error.message);
      }
    }
  
    showFiles() {
      const fileList = document.getElementById("file-list");
      fileList.innerHTML = "";
  
      if (this.files.length === 0) {
        fileList.innerHTML = "<li>No files available.</li>";
        return;
      }
  
      this.files.forEach((file, index) => {
        const li = document.createElement("li");
        li.textContent = file.name;
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => this.deleteFile(index);
  
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download";
        downloadButton.onclick = () => this.downloadFile(file);
  
        li.appendChild(downloadButton);
        li.appendChild(deleteButton);
        fileList.appendChild(li);
      });
    }
  
    deleteFile(index) {
      try {
        const deletedFile = this.files.splice(index, 1);
        alert(`File "${deletedFile[0].name}" deleted successfully.`);
        this.showFiles();
      } catch (error) {
        alert("Error deleting file: " + error.message);
      }
    }
  

    downloadFile(file) {
      try {
        const blob = new Blob([file.content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.name;
        link.click();
      } catch (error) {
        alert("Error downloading file: " + error.message);
      }
    }
  
    clearInputs() {
      document.getElementById("file-name").value = "";
      document.getElementById("file-content").value = "";
    }
  }
  
  const fileManager = new FileManager();
  