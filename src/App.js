import React, { Component } from 'react';
import * as d3 from 'd3';
import logo from './logo.svg';
import Chart from './Chart/Chart';
import { range, sum } from 'jsutils';
import pdfs from 'statistical-distributions';

import './App.css';

const count = 30;
const xs = range(count).map(x => x + 1);
function getPdfArgs(pdf) {
  switch (pdf) {
    case 'normal': return { count, xs, variance: count / 4, mean: count / 2};
    case 'logNormal': return { count, xs, mean: 0, variance: 20 };
    case 'single': return { count, xs, mean: 50, variance: 20 };
    case 'zipf': return { s: 1 };
    default: return { count, xs, mean: 25, variance: 20 };
  }
}

const samples = Object.keys(pdfs).map((pdf) => {
  let ys = xs.map(x => pdfs[pdf](getPdfArgs(pdf))(x));
  ys = ys.map(n => n / sum(ys));

  return ({
    key: pdf,
    x: xs,
    y: ys,
  })
;
});

const linear = range(10).map((n) => {
  let ys = xs.map(x => pdfs.normal({ count, xs, mean: count / 2, variance: n - 2 })(x));
  ys = ys.map(n => n / (Math.max(...ys) || 1));

  return ({
    name: `$\\sigma = ${n}$`,
    x: xs,
    y: ys,
  });
});

const exponential = range(10).map((n) => {
  let ys = xs.map(x => pdfs.normal({ count, xs, mean: count / 2, variance: 2 ** (n - 2) })(x));
  ys = ys.map(n => n / sum(ys));

  return ({
    name: `$\\sigma = 2^{${(n - 2)}}$`,
    x: xs,
    y: ys,
  })
;
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Probability Density Distributions</h2>
        </header>
        <main className="App-content">
          <Chart
            data={[
              {name: 'Normal', y : xs.map(pdfs.normal({ count, xs, mean: 1, variance: Math.sqrt(2) }))},
              {name: '"LogNormal" Monte Carlo', y :range(20).map(() => (d3.randomNormal(0, 1)()) ** 4).sort((a, b) => b - a)},
              {name: 'Zipf', y : xs.map((x)=>pdfs.zipf({ count })(x+1))},
            ].map(({y,name}) => ({ x: xs, y: y.map(n => n / sum(y)*100), name, type: 'bar' }))
            }
            layout={{
              title: 'Normal (mean = 1, variance = sqrt(2)), LogNormal Monte Carlo (n=20), Zipf(k=1)',
              yaxis: {
                ticksuffix: '%',
                title: '$\\text{Portion of total area}\\quad(\\sum_{n=1}^{100} f(n) = 100\\%)$',
              },
              xaxis: {
                range: [0, 20],
              },
            }}
          />
          {
            samples.map(({ key, x, y }) => <Chart
              key={key}
              className={key}
              data={[{ x, y: y.map(n => n * 100), type: 'bar' }]}
              layout={{
                title: key,
                yaxis: {
                  ticksuffix: '%',
                  title: '$\\text{Portion of total area}\\quad(\\sum_{n=1}^{100} f(n) = 100\\%)$',
                },
              }}
            />)
          }
          {
          [
            { data: linear, title: '$\\text{Normal distribution with linear variance increments} (\\mu=50)$' },
            { data: exponential, title: '$\\text{Normal distribution with exponential variance increments} (\\mu=50) $' },
          ].map(sample =>
            <Chart
              key={sample.title}
              className={'variances'}
              data={sample.data.map(({ y, ...rest }) => ({ y: y.map(n => n * 100), type: 'line', ...rest }))}
              layout={{
                title: sample.title,
                xaxis: {
                  range: [35, 65],
                },
                yaxis: {
                  ticksuffix: '%',
                  title: '$\\text{Portion of total area}\\quad(\\sum_{n=1}^{100} f(n) = 100\\%)$',
                },
              }}
            />)
          }
        </main>
      </div>
    );
  }
}

export default App;
