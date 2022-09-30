import { data } from "./data.js";

const margin = {
    top: 20,
    right: 0, 
    bottom: 30,
    left: 60
}
const width = 1000;
const height = 700;
// axis
// x = [margin.left, width - margin.right]
// y = [height - margin.bottom, margin.top]

// y axis scale
const y = d3.scaleLinear()
                .domain([d3.min(data, d => d["Death toll"] - 5000), d3.max(data, d => d["Death toll"])])
                .range([height - margin.bottom, margin.top]);

// x axis scale
const x = d3.scaleBand()
                .domain(data.map(d => d["Year"]))
                .range([margin.left, width])
                .padding(0.2);

// custom tooltip
const tooltip = d3.select("#chart")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "#d3d3d3")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "5px")
                .style("position", "absolute")
                .style("box-shadow", "0 0 4px 2px #d3d3d3")

const mouseover = function(e) {
    tooltip
        .style("opacity", 1)
    d3.select(this)
        .style("cursor", "crosshair")
        .style("outline-style", "solid")
        .style("outline-color", "black")
        .style("outline-width", "1px")
        .style("outline-offset", "1px")
}

// format number comma for thousand
const numberFormatter = Intl.NumberFormat("em-US")

const mousemove = function(e) {
    tooltip
        .html(
            `<strong>Event:</strong> ${e.toElement.__data__["Event"]}<br>
            <strong>Countries affected:</strong> ${e.toElement.__data__["Countries affected"]}<br>
            <strong>Death toll:</strong> ${numberFormatter.format(e.toElement.__data__["Death toll"])}<br>
            <strong>Type:</strong> ${e.toElement.__data__["Type"]}<br>
            <strong>Date:</strong> ${e.toElement.__data__["Date"]}<br>
            <strong>Year:</strong> ${e.toElement.__data__["Year"]}<br>
            `
            )
        .style("left", `${e.pageX + 15}px`)
        .style("top", `${e.pageY}px`)
}

const mouseleave = function(e) {
    tooltip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("outline-color", "transparent")
}

// chart
const svg = d3.select("#chart")
                .append("svg")
                .attr("viewbox", [0, 0, width, height])
                .attr("width", "100%")
                .attr("height", height)

// color for types
const heatwave = "#CC3636"
const earthquake = "#A47E3B"
const landslide = "#E6B325"
const tsunami = "#5F6F94"
const flood = "#97D2EC"
const tropical = "#FD841F"
const earth_tsunami = "#002B5B"

const type = ["Earthquake", "Landslide", "Heat wave", "Tsunami", "Flood", "Tropical cyclone", "Earthquake, Tsunami"]
const colors = [earthquake, landslide, heatwave, tsunami, flood, tropical, earth_tsunami]

// scale type to color
let color = d3.scaleOrdinal()
            .domain(type)
            .range(colors)

svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
        .attr("cx", d => x(d["Year"]))
        .attr("cy", d => y(d["Death toll"]))
        .attr("r", d => 7)
        .style("border-radius", "5px")
        .style("fill", (d, i) => color(d.Type))
        .on("mousemove", mousemove)
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)

// x-axis
svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .attr("font-weight", "bold")
    .call(d3.axisBottom(x).tickSizeOuter(0));

// y-axis
svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .attr("font-weight", "bold")
    .call(d3.axisLeft(y).tickSizeOuter(0));

// legend
const size = 10
svg.selectAll("legend")
            .data(type)
            .enter()     
            .append("rect")          
                .attr("x", width - 180)
                .attr("y", (d, i) => (200 + i*(size + 7)))
                .attr("width", size)
                .attr("height", size)
                .style("fill", d => color(d))

svg.selectAll("legendlabel")
            .data(type)
            .enter()
            .append("text")
                .attr("x", width - 165)
                .attr("y", (d, i) => (200 + i*(size + 7) + (size/2)))
                // .style("fill", d => color(d))
                .style("fill", "black")
                .style("font-size", 15)
                .text(d => d)
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle")