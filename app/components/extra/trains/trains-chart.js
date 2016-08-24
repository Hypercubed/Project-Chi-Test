// from http://bl.ocks.org/mbostock/5544621
// https://gist.github.com/mbostock/5544621
import d3 from 'd3';

export default function Chart (opts) {
  opts = opts || {};

  return function chart (selection) {
    selection.each(function (d) {
      const el = d3.select(this);

      el.selectAll('svg').remove();

      const stations = []; // lazily loaded

      const formatTime = d3.time.format('%I:%M%p');

      const margin = {top: 20, right: 30, bottom: 20, left: 100};
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const x = d3.time.scale()
        .domain([parseTime('5:30AM'), parseTime('11:30AM')])
        .range([0, width]);

      const y = d3.scale.linear()
      .range([0, height]);

      const z = d3.scale.linear()
        .domain([0.0001, 0.0003])
        .range(['purple', 'orange'])
        .interpolate(d3.interpolateLab);

      const xAxis = d3.svg.axis()
        .scale(x)
        .ticks(8)
        .tickFormat(formatTime);

      const svg = el.append('svg')
        .attr('title', 'Marey’s Trains')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      svg.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('y', -margin.top)
        .attr('width', width)
        .attr('height', height + margin.top + margin.bottom);

      const trains = d.map(type);

      y.domain(d3.extent(stations, d => d.distance));

      const station = svg.append('g')
        .attr('class', 'station')
        .selectAll('g')
        .data(stations)
        .enter().append('g')
        .attr('transform', d => `translate(0,${y(d.distance)})`);

      station.append('text')
        .attr('x', -6)
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .text(d => d.name);

      station.append('line')
        .attr('x2', width);

      svg.append('g')
        .attr('class', 'x top axis')
        .call(xAxis.orient('top'));

      svg.append('g')
        .attr('class', 'x bottom axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis.orient('bottom'));

      const train = svg.append('g')
        .attr('class', 'train')
        .attr('clip-path', 'url(#clip)')
        .selectAll('g')
        .data(trains.filter(d => /[NLB]/.test(d.type)))
        .enter().append('g')
        .attr('class', d => d.type);

      train.selectAll('line')
        .data(d => {
          return d.stops.slice(1).map((b, i) => {
            return [d.stops[i], b];
          });
        })
        .enter().append('line')
        .attr('x1', d => x(d[0].time))
        .attr('x2', d => x(d[1].time))
        .attr('y1', d => y(d[0].station.distance))
        .attr('y2', d => y(d[1].station.distance))
        .style('stroke', d => z(Math.abs((d[1].station.distance - d[0].station.distance) / (d[1].time - d[0].time))));

      train.selectAll('circle')
        .data(d => d.stops)
        .enter().append('circle')
        .attr('transform', d => `translate(${x(d.time)},${y(d.station.distance)})`)
        .attr('r', 2);

      function type (d, i) {
        // Extract the stations from the 'stop|*' columns.
        if (!i) {
          for (const k in d) {
            if (/^stop\|/.test(k)) {
              const p = k.split('|');
              stations.push({
                key: k,
                name: p[1],
                distance: Number(p[2]),
                zone: Number(p[3])
              });
            }
          }
        }

        return {
          number: d.number,
          type: d.type,
          direction: d.direction,
          stops: stations
            .map(s => {
              return {station: s, time: parseTime(d[s.key])};
            })
            .filter(s => {
              return s.time != null;
            })
        };
      }

      function parseTime (s) {
        const t = formatTime.parse(s);
        if (t != null && t.getHours() < 3) {
          t.setDate(t.getDate() + 1);
        }
        return t;
      }
    });
  };
}
