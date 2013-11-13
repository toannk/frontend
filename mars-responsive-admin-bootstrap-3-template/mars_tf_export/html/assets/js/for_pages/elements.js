$(function() {
  $(".ui-slider").slider({
    range: "max",
    min: 1,
    max: 10,
    value: 2,
    slide: function(event, ui) {
      $("#slider-value").val(ui.value);
    }
  });

  Morris.Donut({
    element: 'piechart',
    data: [
      {label: 'Jam', value: 25 },
      {label: 'Frosted', value: 40 },
      {label: 'Custard', value: 25 },
      {label: 'Sugar', value: 10 }
    ],
    colors: ["#3498db", "#34495e", "#1abc9c", "#34495e", "#9b59b6", "#95a5a6"],
    formatter: function (y) { return y + "%" }
  });




  Morris.Bar({
    element: 'topsellers_barchart',
    data: [
      {device: '3G', geekbench: 137},
      {device: '3GS', geekbench: 275},
      {device: '4', geekbench: 380},
      {device: '4S', geekbench: 655},
      {device: '5', geekbench: 1571}
    ],
    xkey: 'device',
    ykeys: ['geekbench'],
    labels: ['Geekbench'],
    barRatio: 0.4,
    xLabelAngle: 35,
    hideHover: 'auto'
  });
});
