    /*
    var dropdown = document.getElementsByClassName("dropdown-form");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }*/

      function handleDropdown(e) {
        let studentHeader = e.parentNode;
        let dropdownContent = studentHeader.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        };
      }

      function handleImgBool(e) {
        if (e.value == "iya") {
          document.getElementById("theme-container").innerHTML = `
          <input type="radio" id="opt-1" name="theme-with-img" value="opt-1">
          <label for="opt-1">Opt 1</label><br>
          <input type="radio" id="opt-2" name="theme-with-img" value="opt-2">
          <label for="opt-2">Opt 2</label><br>
          <input type="radio" id="opt-3" name="theme-with-img" value="opt-3">
          <label for="opt-3">Opt 3</label>
          <br><br>
          <input id="file" type="file" onchange="saveFile(this)">

          <img scr="https://drive.google.com/file/d/1THSQIWZyjhZ6f0-2GhPJOVcjNcBkqV-c/view?usp=sharing" alt="opt-1">
          `
        } else {
          document.getElementById("theme-container").innerHTML = `
          <input type="radio" id="opt-1" name="theme-without-img" value="opt-1">
          <label for="opt-1">Opt 1</label><br>
          <input type="radio" id="opt-2" name="theme-without-img" value="opt-2">
          <label for="opt-2">Opt 2</label><br>
          <input type="radio" id="opt-3" name="theme-without-img" value="opt-3">
          <label for="opt-3">Opt 3</label>
          `
        };
      }

      function handleSubmit(destinationUrl) {
        let message = document.getElementById("writtingsText").value
        let sender = document.getElementById("senderName").value

        if (sender == "") {
          sender = "anonim"
        }
        
        document.getElementById("resp").innerHTML = "Palancas Berhasil Dikirim";
        alert("Palancas Berhasil Dikirim")
        google.script.run.appendSlide(message, sender)//, destinationUrl);
      }

      function saveFile(f) {
      const file = f.files[0];
      const fr = new FileReader();
      fr.onload = function(e) {
        const obj = {
          filename: file.name,
          mimeType: file.type,
          bytes: [...new Int8Array(e.target.result)]
        };
        document.getElementById("sendFile").addEventListener("click", google.script.run.withSuccessHandler(e => console.log(e)).saveFile(obj));
        
        };
      fr.readAsArrayBuffer(file);
      }
