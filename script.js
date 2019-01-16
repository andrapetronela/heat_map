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
    
const months = ["January","February","March","April","May","June","July",
 "August","September","October","November","December"];
    
const svg = d3.select('body')
                .append('svg')
                .attr('id', 'chart')
                .attr('width', width)
                .attr('height', height);

const description = d3.select('#description')
                        .html('Base Temperature: ' + dataset.baseTemperature);
    
const month = d3.timeFormat('%B');

const xScale = d3.scaleLinear()
                    .domain([d3.min(dataset.monthlyVariance, (d) => d.year), d3.max(dataset.monthlyVariance, (d) => d.year)])
                    .range([margin, width-margin]);
    
const yScale = d3.scaleLinear()
                    .domain([0, 12])
                    .range([5, height-margin]);
    
const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format('d'));

const yAxis = d3.axisLeft(yScale)
                .tickFormat((d, i) => months[i]);
                
    

 
svg.append('g')
    .attr('transform', 'translate(0, ' + (height - margin) + ')')
    .attr('id', 'x-axis')
    .call(xAxis);

svg.append('g')
    .attr('transform', 'translate(50, 0)')
    .attr('id', 'y-axis')
    .attr('x', 0)
    .call(yAxis);
}