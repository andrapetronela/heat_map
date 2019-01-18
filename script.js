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
    
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
const svg = d3.select('body')
                .append('svg')
                .attr('id', 'chart')
                .attr('width', width)
                .attr('height', height);

const description = d3.select('#description')
                        .html('Base Temperature: ' + dataset.baseTemperature);
    
const xScale = d3.scaleLinear()
                    .domain([d3.min(dataset.monthlyVariance,(d) => d.year), d3.max(dataset.monthlyVariance,(d) => d.year)])
                    .range([margin, width-5]);
    
const yScale = d3.scaleLinear()
                    .domain([0, months.length-1])
                    .range([5, height-margin*2]);
    
const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format('d'));

const yAxis = d3.axisLeft(yScale)
                .tickFormat((d, i) => months[d]);

svg.append('g')
    .attr('transform', 'translate(0, ' + (height - margin) + ')')
    .attr('id', 'x-axis')
    .call(xAxis);

svg.append('g')
    .attr('transform', 'translate(40, 0)')
    .attr('id', 'y-axis')
    .style('font', '7px times')
    .attr('x', 0)
    .call(yAxis);
   
svg.selectAll('rect')
    .data(dataset.monthlyVariance)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('x', (d, i) => xScale(d.year))
    .attr('y', (d) => yScale(d.month-1))
    .attr('width', (width-margin) / (dataset.monthlyVariance[dataset.monthlyVariance.length-1].year - dataset.monthlyVariance[0].year))
    .attr('height', (d) => (height-margin) / 12)
    .attr('data-month', (d) => d.month - 1)
    .attr('data-year', (d) => d.year)
    .attr('data-temp', (d) => d.variance)
    .attr('fill', (d) => { if (Math.sign(d.variance) === 1) { return '#dbef86'}
                            else if (Math.sign(d.variance) === -1 && d.variance > -1.5) { return '#dbe561'}
                            else if (d.variance > 1.5) { return '#e5a361'}
                            else if (d.variance > 2) { return '#4a8ad4'}
                            else if (d.variance === 0) { return '#4ad48f' }
                            else return '#e5b761';
                         })
}



