"use client"

import { useEffect, useRef } from "react"
import * as d3 from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';

interface Node {
  id: string
  group: number
}

interface Link {
  source: string
  target: string
  value: number
}

interface Graph {
  nodes: Node[]
  links: Link[]
}

// Improved data structure with better logical flow and balanced values
const data: Graph = {
  nodes: [
    // Stage 1 - Initial
    { id: "Breaking News", group: 1 },
    
    // Stage 2 - Primary Reactions
    { id: "Media Coverage", group: 2 },
    { id: "Government Response", group: 2 },
    { id: "Public Awareness", group: 2 },
    
    // Stage 3 - Detailed Analysis
    { id: "Expert Commentary", group: 3 },
    { id: "Economic Analysis", group: 3 },
    { id: "Political Debate", group: 3 },
    
    // Stage 4 - Outcomes
    { id: "Policy Changes", group: 4 },
    { id: "Market Impact", group: 4 },
    { id: "Public Opinion", group: 4 },
    
    // Stage 5 - Final Impact
    { id: "Long-term Effects", group: 5 },
  ],
  links: [
    // Stage 1 → Stage 2: Initial story breaks
    { source: "Breaking News", target: "Media Coverage", value: 40 },
    { source: "Breaking News", target: "Government Response", value: 30 },
    { source: "Breaking News", target: "Public Awareness", value: 35 },
    
    // Stage 2 → Stage 3: Deeper analysis begins
    { source: "Media Coverage", target: "Expert Commentary", value: 25 },
    { source: "Media Coverage", target: "Economic Analysis", value: 15 },
    { source: "Government Response", target: "Political Debate", value: 20 },
    { source: "Public Awareness", target: "Expert Commentary", value: 20 },
    { source: "Public Awareness", target: "Political Debate", value: 15 },
    
    // Stage 3 → Stage 4: Analysis leads to outcomes
    { source: "Expert Commentary", target: "Public Opinion", value: 30 },
    { source: "Economic Analysis", target: "Market Impact", value: 15 },
    { source: "Political Debate", target: "Policy Changes", value: 25 },
    
    // Stage 4 → Stage 5: Final consolidation
    { source: "Policy Changes", target: "Long-term Effects", value: 25 },
    { source: "Market Impact", target: "Long-term Effects", value: 15 },
    { source: "Public Opinion", target: "Long-term Effects", value: 30 },
  ],
}

export default function ImprovedNarrativeFlow() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 900
    const height = 500
    const margin = { top: 20, right: 150, bottom: 20, left: 150 }

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")

    // Create a Sankey diagram with better spacing
    const sankeyGenerator = d3Sankey()
      .nodeId((d: any) => d.id)
      .nodeWidth(20)
      .nodePadding(15)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ])

    // Format the data for Sankey
    const sankeyData = sankeyGenerator({
      nodes: data.nodes.map((d) => Object.assign({}, d)),
      links: data.links.map((d) => Object.assign({}, d)),
    })

    // Better color scheme for different stages
    const stageColors = {
      1: "#1f77b4", // Blue - Initial
      2: "#ff7f0e", // Orange - Primary reactions
      3: "#2ca02c", // Green - Analysis
      4: "#d62728", // Red - Outcomes
      5: "#9467bd"  // Purple - Final impact
    }

    // Add gradient definitions for links
    const defs = svg.append("defs")
    
    sankeyData.links.forEach((link: any, i: number) => {
      const gradientId = `gradient-${i}`
      const gradient = defs.append("linearGradient")
        .attr("id", gradientId)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", link.source.x1)
        .attr("x2", link.target.x0)
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", stageColors[link.source.group])
        .attr("stop-opacity", 0.6)
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", stageColors[link.target.group])
        .attr("stop-opacity", 0.6)
    })

    // Add links with gradients
    svg
      .append("g")
      .selectAll("path")
      .data(sankeyData.links)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d: any, i: number) => `url(#gradient-${i})`)
      .attr("stroke-width", (d: any) => Math.max(2, d.width))
      .attr("fill", "none")
      .attr("opacity", 0.7)
      .on("mouseover", function(event, d: any) {
        d3.select(this).attr("opacity", 1).attr("stroke-width", (d: any) => Math.max(3, d.width + 1))
        
        // Show tooltip
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0,0,0,0.8)")
          .style("color", "white")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .html(`<strong>${d.source.id}</strong> → <strong>${d.target.id}</strong><br/>Flow strength: ${d.value}`)
      })
      .on("mouseout", function(event, d: any) {
        d3.select(this).attr("opacity", 0.7).attr("stroke-width", (d: any) => Math.max(2, d.width))
        d3.selectAll(".tooltip").remove()
      })

    // Add nodes with better styling
    svg
      .append("g")
      .selectAll("rect")
      .data(sankeyData.nodes)
      .enter()
      .append("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("fill", (d: any) => stageColors[d.group])
      .attr("stroke", "#333")
      .attr("stroke-width", 1)
      .attr("rx", 3) // Rounded corners
      .on("mouseover", function(event, d: any) {
        d3.select(this).attr("stroke-width", 3)
      })
      .on("mouseout", function(event, d: any) {
        d3.select(this).attr("stroke-width", 1)
      })

    // Add node labels with better positioning
    svg
      .append("g")
      .selectAll("text")
      .data(sankeyData.nodes)
      .enter()
      .append("text")
      .attr("x", (d: any) => (d.x0 < width / 2 ? d.x1 + 8 : d.x0 - 8))
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d: any) => d.id)
      .attr("font-size", "13px")
      .attr("font-weight", "600")
      .attr("fill", "#333")
      .style("text-shadow", "1px 1px 2px rgba(255,255,255,0.8)") // Better readability

    // Add stage labels
    const stages = [
      { x: margin.left + 50, y: margin.top - 5, label: "Initial Event", color: stageColors[1] },
      { x: width * 0.3, y: margin.top - 5, label: "Primary Reactions", color: stageColors[2] },
      { x: width * 0.5, y: margin.top - 5, label: "Analysis Phase", color: stageColors[3] },
      { x: width * 0.7, y: margin.top - 5, label: "Outcomes", color: stageColors[4] },
      { x: width - margin.right - 50, y: margin.top - 5, label: "Long-term Impact", color: stageColors[5] }
    ]

    svg.selectAll(".stage-label")
      .data(stages)
      .enter()
      .append("text")
      .attr("class", "stage-label")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("fill", d => d.color)
      .text(d => d.label)

    return () => {
      d3.selectAll(".tooltip").remove()
    }
  }, [])

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-white border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Narrative Flow Analysis</h2>
        <p className="text-gray-600">Information cascade from breaking news through to long-term societal impact</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Initial Event</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Primary Reactions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Analysis Phase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Outcomes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span>Long-term Impact</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <svg ref={svgRef} className="w-full h-[500px]"></svg>
      </div>
    </div>
  )
}