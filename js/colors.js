allStormList = [
  [1, "#1ab701"],
  [2, "#3D9DB3"],
  [3, "#ef2009"]
];

lsr_list = [
  [0, "#fff"], // other
  [1, "#099ce6"], // heavy snow
  [2, "#2f2fbd"], // blizzard
  [3, "#a73bd9"], // sleet/ freezing rain
  [4, "#de2ad8"], // Extreme cold

  [5, "#FB8604"], // wind gust
  [6, "#FDB768"], // Wind damage
  [7, "#FEEEDC"], // High Sus wind

  [9, "#FDED2A"], // marine wind
  [10, "#C0B002"], // waterspout

  [11, "#53c68c"], // heavy rain
  [12, "#00b300"], // flood
  [13, "#008000"], // flash flood
  [14, "#c2f0c2"] // coastal flood
];

earthquake_list = [
  // richter scale
  [1, "#ffff42"],
  [2, "#F7E53C"],
  [3, "#E9B230"],
  [4, "#DB7F25"],
  [5, "#d4661f"],
  [6, "#cd4c19"],
  [7, "#bf190d"],
  [8, "#bf0ac6"],
  [9, "#bf0ac6"],
  [10, "#bf0ac6"]
];

earthquake_size_list = [
  [1, 2],
  [2, 3.5],
  [3, 5],
  [4, 10],
  [5, 15],
  [6, 20],
  [7, 25],
  [8, 25],
  [9, 35],
  [10, 50]
];

drought_list = [
  [0, "#FFFF02"],
  [1, "#FCD37F"],
  [2, "#FFAA00"],
  [3, "#E70000"],
  [4, "#007300"]
];

lsr_layers = {
  "heavy-snow": {
    eventNum: 1
  },
  blizzard: {
    eventNum: 2
  },
  sleet: {
    eventNum: 3
  },
  "extreme-cold": {
    eventNum: 4
  },
  "heavy-rain": {
    eventNum: 11
  },
  flood: {
    eventNum: 12
  },
  "flash-flood": {
    eventNum: 13
  },
  "coastal-flood": {
    eventNum: 14
  },
  "wind-gust": {
    eventNum: 5
  },
  "wind-dmg": {
    eventNum: 6
  },
  "wind-sus": {
    eventNum: 7
  },
  "marine-tstm-wind": {
    eventNum: 9
  },
  waterspout: {
    eventNum: 10
  }
};
