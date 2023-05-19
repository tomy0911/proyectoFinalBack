fetch("/prefixes.json")
  .then((response) => response.json())
  .then((data) => {
    let prefixes = data;
    let select = document.getElementById("prefix");
    prefixes.forEach((prefix) => {
      let option = document.createElement("option");
      option.name = prefix.name;
      option.value = prefix.dial_code;
      option.innerText = prefix.name + " | " + prefix.dial_code;
      select.appendChild(option);
    });
  });
