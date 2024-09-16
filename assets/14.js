
const customDecorationInput = document.getElementById('customDecorationInput');
const customDecorationUrlInput = document.getElementById('customDecorationUrlInput');
const loadCustomDecorationUrlButton = document.getElementById('loadCustomDecorationUrl');
const customDecorationPreview = document.getElementById('customDecorationPreview');
const dataUrlOutput = document.getElementById('dataUrlOutput');

// Function to handle file upload
customDecorationInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      
      // Display custom decoration preview
      customDecorationPreview.src = dataUrl;
      customDecorationPreview.style.display = 'block';

      // Display Data URL
      dataUrlOutput.textContent = dataUrl;
    };
    
    reader.readAsDataURL(file);
  }
});

// Function to handle custom decoration URL input
loadCustomDecorationUrlButton.addEventListener('click', function() {
  const customDecorationUrl = customDecorationUrlInput.value;
  
  if (customDecorationUrl) {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // This is needed to avoid CORS issues

    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0);

      // Convert custom decoration to Data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Display custom decoration preview
      customDecorationPreview.src = dataUrl;
      customDecorationPreview.style.display = 'block';

      // Display Data URL
      dataUrlOutput.textContent = dataUrl;
    };

    img.src = customDecorationUrl;
  }
});






const inputs = {
  name: document.getElementById('deco-name-intput-box'),
  description: document.getElementById('deco-desc-intput-box'),
  id: document.getElementById('deco-skuid-input-box'),
  animatedLink: document.getElementById('deco-animated-link-input-box'),
  staticLink: document.getElementById('deco-static-link-input-box'),
  price: document.getElementById('deco-price-input-box'),
  price2: document.getElementById('deco-price2-input-box')
};

// Define output elements
const outputs = {
  name: document.getElementById('deco-name-output-text'),
  description: document.getElementById('deco-desc-output-text'),
  id: document.getElementById('deco-skuid-output-text'),
  animatedLink: document.getElementById('deco-animated-link-output-text'),
  staticLink: document.getElementById('deco-static-link-output-text'),
  price: document.getElementById('deco-price-output-text'),
  price2: document.getElementById('deco-price2-output-text')
};

// Add event listeners to update text live
for (const key in inputs) {
  inputs[key].addEventListener('input', function() {
      outputs[key].textContent = `${inputs[key].value}`;
  });
}

// Load JSON from textarea into inputs
document.getElementById('load-json-button').addEventListener('click', function() {
  try {
      const jsonData = JSON.parse(document.getElementById('json-input').value);
      
      // Populate the input fields with the JSON data
      inputs.name.value = jsonData.name || "";
      inputs.description.value = jsonData.summary || "";
      inputs.id.value = jsonData.sku_id || "";
      inputs.price.value = jsonData.price || "";
      inputs.price2.value = jsonData.price_nitro || "";
      inputs.staticLink.value = jsonData.items[0].static || "";
      inputs.animatedLink.value = jsonData.items[0].animated || "";

      // Trigger input events to update the live preview
      for (const key in inputs) {
          inputs[key].dispatchEvent(new Event('input'));
      }
  } catch (e) {
      alert("Invalid JSON! Please check the format.");
  }
});

// Copy button functionality
document.getElementById('copy-button').addEventListener('click', function() {
  // Create JSON string for API use
  const jsonData = {
      name: inputs.name.value,
      summary: inputs.description.value,
      sku_id: inputs.id.value,
      price: inputs.price.value,
      price_nitro: inputs.price2.value,
      unpublished_at: null,
      isNew: "false",
      emojiCopy: null,
      items: [
          {
              item_type: "deco",
              name: inputs.name.value,
              static: inputs.staticLink.value,
              animated: inputs.animatedLink.value,
              summary: inputs.description.value
          }
      ]
  };

  // Stringify JSON data with indentation for better formatting
  const jsonString = JSON.stringify(jsonData, null, 4);

  // Create a temporary textarea to hold the text
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = jsonString;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextarea);
});



document.getElementById('convert-button').addEventListener('click', function() {
  try {
      // Parse the input JSON
      const inputJson = JSON.parse(document.getElementById('api-input').value);

      // Extract values from the input JSON
      const name = inputJson.name;
      const summary = inputJson.summary;
      const sku_id = inputJson.sku_id;
      const asset = inputJson.items[0]?.asset || "";
      const staticLink = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=4096&passthrough=false`;
      const animatedLink = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=4096&passthrough=true`;

      // Create the converted JSON object
      const convertedJson = {
          name: name,
          summary: summary,
          sku_id: sku_id,
          price: "price",
          price_nitro: "price2",
          unpublished_at: null,
          isNew: "false",
          emojiCopy: null,
          items: [
              {
                  item_type: "deco",
                  name: name,
                  static: staticLink,
                  animated: animatedLink,
                  summary: summary
              }
          ]
      };

      // Display the converted JSON
      document.getElementById('converted-api').value = JSON.stringify(convertedJson, null, 4);
  } catch (e) {
      alert("Invalid JSON! Please check the format.");
  }
});