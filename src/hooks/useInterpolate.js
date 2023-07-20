// https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string

/*const example = "Thank you. You were diagnosed with ${Diagnosis}. Did Dr ${Doctor Last Name} explain how to manage this diagnosis in a way you could understand?";
const values = {
  Diagnosis: 'agoraphobia',
  'Doctor Last Name': 'Zivago'
}*/

// get the specified property or nested property of an object
// assumes single dimensional arrays
// getValueAtPath('patient.name[0]', {patient: {name: ['Bob']}})
function getValueAtPath(path, obj, fallback = '') {
  const arrayRegex = /\[\d+\]/;
  const getIndexRegex = /\d+/;
  const final = path.split('.').reduce((res, key) => {
    // console.log(res, key);
    const arrayResult = arrayRegex.exec(key);
    let result;
    if(arrayResult) {
    // console.log('arrayResult[1]:', arrayResult[0], arrayResult.index, arrayResult);
      const index = getIndexRegex.exec(arrayResult[0])[0];
      const arrayKey = key.slice(0, arrayResult.index);
      // console.log('index:', arrayKey, index, res);
      result = res[arrayKey][index] || fallback;
    }   else {
      result = res[key] || fallback;
    }
    return result;
  }, obj);
  // console.log('final', final);
  return final;
}

const useInterpolate = mappings => {
  const bracesRegex = /\${[^{]+}/g;
  return function interpolate(template, variables, fallback) {
    // console.log('template:', template);
    return template.replace(bracesRegex, (match) => {
      const path = mappings[match.slice(2, -1).trim()];
      // console.log('path', path);
      return getValueAtPath(path, variables, fallback);
    });
  }
}

export { useInterpolate }