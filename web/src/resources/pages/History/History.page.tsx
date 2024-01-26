import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Wrapper } from '../../components/';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

interface Dados {
  dataChegada: string;
  fosforo: number;
  id: string;
  nitrogenio: number;
  ph: number;
  potassio: number;
  temperatura: number;
  umidade: number;
}

export function History(): JSX.Element {
  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
    }[];
  }

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Fósforo',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Nitrogênio',
        data: [],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Potássio',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 206, 86, 1)',
      },
      {
        label: 'Temperatura',
        data: [],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
      },
      {
        label: 'Umidade',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'PH',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
      },
    ],
  });

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const convertToCSV = () => {
    const csvData = chartData.labels.map((label: string, index: number) => {
      const dataRow = [label];
      chartData.datasets.forEach((dataset: any) => {
        dataRow.push(dataset.data[index].toString());
      });
      return dataRow.join(',');
    });
  
    const csv = ['data', ...chartData.datasets.map((dataset: any) => dataset.label)].join(',') + '\n' + csvData.join(' ');
  
    return csv;
  };

  const handleDownload = () => {
    const csv = convertToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dados.csv';
    link.click();
  };

  const requestRecort = useCallback(async () => {
    try {
      const { data } = await axios.get<Dados[]>(
        'http://localhost:4040/sensor-solo/get-all-data'
      );

      const dadosPorDia: Record<string, Dados> = {};

      data.forEach((item) => {
        const dia = item.dataChegada.split('T')[0];
        if (!dadosPorDia[dia]) {
          dadosPorDia[dia] = {
            dataChegada: dia,
            fosforo: 0,
            nitrogenio: 0,
            potassio: 0,
            temperatura: 0,
            umidade: 0,
            ph: 0,
            id: '',
          };
        }

        dadosPorDia[dia].fosforo += item.fosforo;
        dadosPorDia[dia].nitrogenio += item.nitrogenio;
        dadosPorDia[dia].potassio += item.potassio;
        dadosPorDia[dia].temperatura += item.temperatura;
        dadosPorDia[dia].umidade += item.umidade;
        dadosPorDia[dia].ph += item.ph;
      });

      const labels = Object.keys(dadosPorDia);

      const dadosMedia: Dados[] = labels.map((label) => {
        const dia = dadosPorDia[label];
        const quantidadeDeMedicoes = data.filter(
          (item) => item.dataChegada.split('T')[0] === label
        ).length;

        return {
          dataChegada: label,
          fosforo: dia.fosforo / quantidadeDeMedicoes,
          nitrogenio: dia.nitrogenio / quantidadeDeMedicoes,
          potassio: dia.potassio / quantidadeDeMedicoes,
          temperatura: dia.temperatura / quantidadeDeMedicoes,
          umidade: dia.umidade / quantidadeDeMedicoes,
          ph: dia.ph / quantidadeDeMedicoes,
          id: '',
        };
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Fósforo',
            data: dadosMedia.map((item) => item.fosforo),
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Nitrogênio',
            data: dadosMedia.map((item) => item.nitrogenio),
            fill: false,
            borderColor: 'rgba(54, 162, 235, 1)',
          },
          {
            label: 'Potássio',
            data: dadosMedia.map((item) => item.potassio),
            fill: false,
            borderColor: 'rgba(255, 206, 86, 1)',
          },
          {
            label: 'Temperatura',
            data: dadosMedia.map((item) => item.temperatura),
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
          },
          {
            label: 'Umidade',
            data: dadosMedia.map((item) => item.umidade),
            fill: false,
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            label: 'PH',
            data: dadosMedia.map((item) => item.ph),
            fill: false,
            borderColor: 'rgba(255, 159, 64, 1)',
          },
        ],
      });

      setDataLoaded(true);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }, []);

  useEffect(() => {
    requestRecort();
  }, [requestRecort]);

  return (
    <Wrapper title="Histórico">
      <div>
        {dataLoaded && (
          <div>
            <Line
              data={chartData}
              options={{
                scales: {
                  x: {
                    type: 'category',
                  },
                },
              }}
            />
            <button onClick={handleDownload}>Baixar CSV</button>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
