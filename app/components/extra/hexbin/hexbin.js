/* Modified from http://bl.ocks.org/mbostock/7833311
  https://gist.github.com/mbostock/7833311 */

import d3 from 'd3';
import 'd3-plugins/hexbin/hexbin';

function controller () {
  const width = 960;
  const height = 500;
  let i = -1;
  let θ = 0;
  const δθ = 0.03;
  const n = 2000;
  const k = 20; // samples to replace per frame

  const svg = d3.select('#chart').append('svg')
    .attr('title', 'hexbins')
    .attr('width', width)
    .attr('height', height);

  let randomX = d3.random.normal(width / 2, 80);
  let randomY = d3.random.normal(height / 2, 80);
  const points = d3.range(n).map(() => [randomX(), randomY()]);

  const color = d3.scale.linear()
    .domain([0, 20])
    .range(['white', 'steelblue'])
    .interpolate(d3.interpolateLab);

  const hexbin = d3.hexbin()
    .size([width, height])
    .radius(20);

  let hexagon = svg.append('g')
    .attr('class', 'hexagons')
    .selectAll('path')
    .data(hexbin(points))
    .enter().append('path')
    .attr('d', hexbin.hexagon(19.5))
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .style('fill', d => color(d.length));

  d3.timer(() => {
    θ += δθ;
    randomX = d3.random.normal((width / 2) + (80 * Math.cos(θ)), 80);
    randomY = d3.random.normal((height / 2) + (80 * Math.sin(θ)), 80);

    for (let j = 0; j < k; ++j) {
      i = (i + 1) % n;
      points[i][0] = randomX();
      points[i][1] = randomY();
    }

    hexagon = hexagon
      .data(hexbin(points), d => `${d.i},${d.j}`);

    hexagon.exit().remove();

    hexagon.enter().append('path')
      .attr('d', hexbin.hexagon(19.5))
      .attr('transform', d => `translate(${d.x},${d.y})`);

    hexagon
      .style('fill', d => color(d.length));
  });
}

export default {
  controller,
  templateUrl: 'components/extra/hexbin/hexbin.html'
};
