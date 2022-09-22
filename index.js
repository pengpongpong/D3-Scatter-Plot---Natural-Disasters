// import { style } from "d3-selection";
import { data } from "./data.js";

// const data = [
//     {
//         "Year": 2001,
//         "Death toll": 20085,
//         "Event": "2001 Gujarat earthquake",
//         "Countries affected": "India",
//         "Type": "Earthquake",
//         "Date": "Jan 26"
//       },
//       {
//         "Year": 2002,
//         "Death toll": 1030,
//         "Event": "2002 Indian heat wave",
//         "Countries affected": "India",
//         "Type": "Heat wave",
//         "Date": "May"
//       },
//       {
//         "Year": 2003,
//         "Death toll": 72000,
//         "Event": "2003 European heat wave",
//         "Countries affected": "Europe",
//         "Type": "Heat wave",
//         "Date": "July – August"
//       },
//       {
//         "Year": 2004,
//         "Death toll": 227898,
//         "Event": "2004 Indian Ocean earthquake and tsunami",
//         "Countries affected": "Indonesia, Sri Lanka, India, Thailand, Somalia",
//         "Type": "Earthquake, Tsunami",
//         "Date": "Dec 26"
//       }
// ]
const margin = {
    top: 20,
    right: 0, 
    bottom: 30,
    left: 60
}
const width = 1000;
const height = 600;
// axis
// x = [margin.left, width - margin.right]
// y = [height - margin.bottom, margin.top]

// y axis scale
const y = d3.scaleLinear()
                .domain([d3.min(data, d => d["Death toll"]), d3.max(data, d => d["Death toll"])])
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
        .style("outline-color", "#00FFAB")
}
const mousemove = function(e) {
    tooltip
        .html(
            `Event: ${e.toElement.__data__["Event"]}<br>
            Countries affected: ${e.toElement.__data__["Countries affected"]}<br>
            Death toll: ${e.toElement.__data__["Death toll"]}<br>
            Type: ${e.toElement.__data__["Type"]}<br>
            Date: ${e.toElement.__data__["Date"]}<br>
            Year: ${e.toElement.__data__["Year"]}<br>
            `
            )
        .style("left", `${e.offsetX + 40}px`)
        .style("top", `${e.offsetY - 7}px`)
}

const mouseleave = function(e) {
    tooltip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("outline-color", "black")
}

// chart
const svg = d3.select("#chart")
                .append("svg")
                .attr("viewbox", [0, 0, width, height])
                .attr("width", width)
                .attr("height", height)

// color for types
const heatwave = "#CC3636"
const earthquake = "#A47E3B"
const landslide = "#E6B325"
const tsunami = "#5F6F94"
const flood = "#97D2EC"
const tropical = "#FD841F"
const earth_tsunami = "#002B5B"

svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
        .attr("cx", d => x(d["Year"]))
        .attr("cy", d => y(d["Death toll"]))
        .attr("r", d => 6)
        .style("outline-style", "solid")
        .style("outline-color", "black")
        .style("outline-width", "1px")
        .style("outline-offset", "2px")
        .style("border-radius", "5px")
        .style("fill", ((d, i) => {
            if(d["Type"] === "Heat wave")
                {return heatwave}
            if(d["Type"] === "Earthquake")
                {return earthquake}
            if(d["Type"] === "Landslide")
                {return landslide}
            if(d["Type"] === "Tsunami")
                {return tsunami} 
            if(d["Type"] === "Flood")
                {return flood}
            if(d["Type"] === "Tropical cyclone")
                {return tropical} 
            if(d["Type"] === "Earthquake, Tsunami")
                {return earth_tsunami} 
            }))
        .on("mousemove", mousemove)
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)

// x-axis
svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .attr("font-weight", "bold")
    .call(d3.axisBottom(x));

// y-axis
svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .attr("font-weight", "bold")
    .call(d3.axisLeft(y));

const yTitle = g => g.append("text")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .attr("font-weight", "bold")
                    .attr("y", 20)
                    .attr("x", 50)
                    .attr("test")

svg.call(yTitle);