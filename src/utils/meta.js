export function setMeta(key, value) {
  let meta = document.querySelector(`meta[name="${key}"]`);
  
  if (meta) {
      // If a meta tag with the given key exists, update its content
      meta.setAttribute("content", value);
  } else {
      // If no meta tag with the given key exists, create one
      meta = document.createElement("meta");
      meta.setAttribute("name", key);
      meta.setAttribute("content", value);
      
      // Append the new meta tag to the head of the document
      document.getElementsByTagName("head")[0].appendChild(meta);
  }
}

export function setPageTitle(title) {
  let titleTag = document.querySelector('title');
  
  if (titleTag) {
      // If a title tag exists, update its content
      titleTag.textContent = title;
  } else {
      // If no title tag exists, create one
      titleTag = document.createElement("title");
      titleTag.textContent = title;
      
      // Append the new title tag to the head of the document
      document.getElementsByTagName("head")[0].appendChild(titleTag);
  }
}
