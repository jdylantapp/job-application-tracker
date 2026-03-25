import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js'
import { Doughnut } from "react-chartjs-2";

export const StatsGraph = ({appliedJobs, interviewJobs, offerJobs, rejectedJobs}) => {


    ChartJS.register(ArcElement, Tooltip, Legend)

    const options = {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label
              }
            }
          }
        }
    }

    const data = {
        labels: [
          'Applied',
          'Interview',
          'Offers',
          'Rejected'
        ],
        datasets: [{
          label: 'Job Insights',
          data: [appliedJobs, interviewJobs, offerJobs, rejectedJobs],
          backgroundColor: [
            'rgb(247, 226, 89)',
            'rgb(89, 197, 247)',
            'rgb(89, 247, 100)',
            'rgb(247, 89, 89)'
          ],
          borderWidth: 0,
          borderRadius: 90,
          spacing: 20,
          cutout: "80%",
          hoverOffset: 4
        }]
      };

    return (
        <div className="w-full max-w-md mx-auto">
            <Doughnut data={data} options={options} />
        </div>
    )
}