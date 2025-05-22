function convertirUriAFile(uri) {
  const filename = uri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  return {
    uri,
    name: filename,
    type,
  };
}
