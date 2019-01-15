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

const xScale = d3.scaleLinear()
                    .domain([d3.min(dataset.monthlyVariance, (d) => d.year), d3.max(dataset.monthlyVariance, (d) => d.year)])
                    .range([margin, width-margin]);
    
const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format('d'));
svg.append('g')
    .attr('transform', 'translate(0, ' + (height - margin) + ')')
    .attr('id', 'x-axis')
    .call(xAxis);
}