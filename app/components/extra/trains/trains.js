import d3 from 'd3';
import Chart from './trains-chart';
import './trains.css!';

function controller () {
  const $ctrl = this;
  const chart = new Chart();

  Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      onChange: draw
    },
    draw,
    $onInit: draw
  });

  function draw () {
    const data = $ctrl.dataPackage.resources.map(d => d.data);

    const divs = d3.select('#_examples_trains__chart')
      .selectAll('div').data(data);

    divs.enter().append('div');

    divs.exit().remove();

    divs.call(chart);
  }
}

export default {
  controller,
  templateUrl: 'components/extra/trains/trains.html',
  bindings: {
    dataPackage: '<package'
  }
};
