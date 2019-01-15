const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

req = new XMLHttpRequest();
req.open('GET', url, true);
req.send();
req.onload = () => {
    req = JSON.parse(req.responseText);
    
const dataset = req;

const width = 800;
const height = 400;
const margin = 40;
    
const svg = d3.select('body')
                .append('svg')
                .attr('id', 'chart')
                .attr('width', width)
                .attr('height', height);

const description = d3.select('#description')
                        .html('Base Temperature: ' + dataset.baseTemperature)

console.log(dataset.baseTemperature);

}