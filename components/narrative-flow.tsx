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

// Fixed data with no circular dependencies
const data: Graph = {
  nodes: [
    { id: "Initial Report", group: 1 },
    { id: "Economic Impact", group: 2 },
    { id: "Political Response", group: 3 },
    { id: "Public Reaction", group: 4 },
    { id: "Expert Analysis", group: 5 },
    { id: "Policy Proposal", group: 3 },
    { id: "Market Response", group: 2 },
    { id: "Social Media", group: 4 },
    { id: "Opposition View", group: 3 },
    { id: "International Perspective", group: 6 },
    { id: "Historical Context", group: 5 },
    { id: "Future Implications", group: 2 },
  ],
  links: [
    // Stage 1: Initial triggers
    { source: "Initial Report", target: "Economic Impact", value: 5 },
    { source: "Initial Report", target: "Political Response", value: 8 },
    { source: "Initial Report", target: "Public Reaction", value: 6 },
    
    // Stage 2: Economic flow
    { source: "Economic Impact", target: "Market Response", value: 7 },
    { source: "Economic Impact", target: "Expert Analysis", value: 4 },
    
    // Stage 3: Political flow
    { source: "Political Response", target: "Policy Proposal", value: 6 },
    { source: "Political Response", target: "Opposition View", value: 5 },
    
    // Stage 4: Public reaction flow
    { source: "Public Reaction", target: "Social Media", value: 9 },
    
    // Stage 5: Analysis and context
    { source: "Expert Analysis", target: "Historical Context", value: 4 },
    { source: "Expert Analysis", target: "Future Implications", value: 5 },
    
    // Stage 6: Policy outcomes
    { source: "Policy Proposal", target: "Future Implications", value: 3 },
    { source: "Policy Proposal", target: "International Perspective", value: 2 },
    
    // Stage 7: Market outcomes
    { source: "Market Response", target: "Future Implications", value: 4 },
    
    // Stage 8: Social influence (no circular dependency)
    { source: "Social Media", target: "Opposition View", value: 3 },
  ],
}

export  function NarrativeFlow() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 600

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")

    // Create a Sankey diagram
    const sankeyGenerator = d3Sankey()
      .nodeId((d: any) => d.id)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 1],
        [width - 1, height - 5],
      ])

    // Format the data for Sankey
    const sankeyData = sankeyGenerator({
      nodes: data.nodes.map((d) => Object.assign({}, d)),
      links: data.links.map((d) => Object.assign({}, d)),
    })

    // Color scale for different groups
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Add links
    svg
      .append("g")
      .selectAll("path")
      .data(sankeyData.links)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d: any) => color(d.source.group.toString()))
      .attr("stroke-width", (d: any) => Math.max(1, d.width))
      .attr("stroke-opacity", 0.5)
      .attr("fill", "none")
      .on("mouseover", function(event, d: any) {
        d3.select(this).attr("stroke-opacity", 0.8)
      })
      .on("mouseout", function(event, d: any) {
        d3.select(this).attr("stroke-opacity", 0.5)
      })
      .append("title")
      .text((d: any) => `${d.source.id} → ${d.target.id}\nValue: ${d.value}`)

    // Add nodes
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
      .attr("fill", (d: any) => color(d.group.toString()))
      .attr("stroke", "#000")
      .attr("stroke-width", 0.5)
      .on("mouseover", function(event, d: any) {
        d3.select(this).attr("stroke-width", 2)
      })
      .on("mouseout", function(event, d: any) {
        d3.select(this).attr("stroke-width", 0.5)
      })
      .append("title")
      .text((d: any) => `${d.id}\nValue: ${d.value}`)

    // Add node labels
    svg
      .append("g")
      .selectAll("text")
      .data(sankeyData.nodes)
      .enter()
      .append("text")
      .attr("x", (d: any) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d: any) => d.id)
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")

    return () => {
      // Cleanup
    }
  }, [])

  return (
    <div className="w-full h-[600px] overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Narrative Flow Analysis</h2>
        <p className="text-sm text-gray-600">Information flow from initial report to various outcomes</p>
      </div>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}