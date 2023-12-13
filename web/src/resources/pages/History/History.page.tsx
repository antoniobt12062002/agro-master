import { useCallback, useEffect, useState } from 'react';
import { Wrapper } from '../../components/';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

interface Dados {
  condutividade: number;
  dataChegada: string;
  fosforo: number;
  id: string;
  nitrogenio: number;
  ph: number;
  potassio: number;
  temperatura: number;
  umidade: number;
}

interface DadosMedia {
  condutividade: number;
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
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Condutividade',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)'
      },
      {
        label: 'Fósforo',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)'
      },
      {
        label: 'Nitrogênio',
        data: [],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)'
      },
      {
        label: 'Potássio',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 206, 86, 1)'
      },
      {
        label: 'Temperatura',
        data: [],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)'
      },
      {
        label: 'Umidade',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)'
      },
      {
        label: 'PH',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)'
      }
    ]
  });

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const requestRecort = useCallback(async () => {
    try {
      const { data } = await axios.get<Dados[]>(
        'http://localhost:4040/sensor-solo/get-all-data'
      );

      console.log('Dados brutos:', data);

      const dadosPorDia: Record<string, DadosMedia> = {};

      data.forEach(item => {
        const dia = item.dataChegada.split('T')[0];
        if (!dadosPorDia[dia]) {
          dadosPorDia[dia] = {
            dataChegada: dia,
            condutividade: 0,
            fosforo: 0,
            nitrogenio: 0,
            potassio: 0,
            temperatura: 0,
            umidade: 0,
            ph: 0,
            id: ''
          };
        }

        dadosPorDia[dia].condutividade += item.condutividade;
        dadosPorDia[dia].fosforo += item.fosforo;
        dadosPorDia[dia].nitrogenio += item.nitrogenio;
        dadosPorDia[dia].potassio += item.potassio;
        dadosPorDia[dia].temperatura += item.temperatura;
        dadosPorDia[dia].umidade += item.umidade;
        dadosPorDia[dia].ph += item.ph;
      });

      const labels = Object.keys(dadosPorDia);

      console.log('Dados agrupados por dia:', dadosPorDia);

      const dadosMedia: DadosMedia[] = labels.map(label => {
        const dia = dadosPorDia[label];
        const quantidadeDeMedicoes = data.filter(
          item => item.dataChegada.split('T')[0] === label
        ).length;

        return {
          dataChegada: label,
          condutividade: dia.condutividade / quantidadeDeMedicoes,
          fosforo: dia.fosforo / quantidadeDeMedicoes,
          nitrogenio: dia.nitrogenio / quantidadeDeMedicoes,
          potassio: dia.potassio / quantidadeDeMedicoes,
          temperatura: dia.temperatura / quantidadeDeMedicoes,
          umidade: dia.umidade / quantidadeDeMedicoes,
          ph: dia.ph / quantidadeDeMedicoes,
          id: ''
        };
      });

      console.log('Dados após o cálculo da média:', dadosMedia);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Condutividade',
            data: dadosMedia.map(item => item.condutividade),
            fill: false,
            borderColor: 'rgba(75,192,192,1)'
          },
          {
            label: 'Fósforo',
            data: dadosMedia.map(item => item.fosforo),
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)'
          },
          {
            label: 'Nitrogênio',
            data: dadosMedia.map(item => item.nitrogenio),
            fill: false,
            borderColor: 'rgba(54, 162, 235, 1)'
          },
          {
            label: 'Potássio',
            data: dadosMedia.map(item => item.potassio),
            fill: false,
            borderColor: 'rgba(255, 206, 86, 1)'
          },
          {
            label: 'Temperatura',
            data: dadosMedia.map(item => item.temperatura),
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)'
          },
          {
            label: 'Umidade',
            data: dadosMedia.map(item => item.umidade),
            fill: false,
            borderColor: 'rgba(255, 159, 64, 1)'
          },
          {
            label: 'PH',
            data: dadosMedia.map(item => item.ph),
            fill: false,
            borderColor: 'rgba(255, 159, 64, 1)'
          }
        ]
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
    <Wrapper title='Histórico'>
      <div>
        {dataLoaded && (
          <Line
            data={chartData}
            options={{
              scales: {
                x: {
                  type: 'category'
                }
              }
            }}
          />
        )}
      </div>
    </Wrapper>
  );
}
