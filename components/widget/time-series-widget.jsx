import { StyleSheet, View } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory-native';
import _ from 'lodash';
import { presetColors } from '../../utils/preset-colors';
import { useCallback } from 'react';
import { subHours } from 'date-fns';

function TimeSeriesWidget({ channel, fields }) {
  const zoomDomain = {
    x: [
      subHours(channel.lastEntry.created_at, 1),
      channel.lastEntry.created_at,
    ],
  };

  const getData = useCallback(
    (key) => {
      return channel.feeds.map((feed) => ({
        x: feed.created_at,
        y: feed[key] ?? null,
      }));
    },
    [channel.feeds]
  );

  return (
    <View>
      <VictoryChart
        height={260}
        scale={{ x: 'time', y: 'linear' }}
        containerComponent={
          <VictoryZoomContainer zoomDimension="x" zoomDomain={zoomDomain} />
        }
      >
        <VictoryAxis
          tickLabelComponent={
            <VictoryLabel dy={0} dx={0} angle={55} style={styles.axisLabel} />
          }
          style={{
            axis: styles.axis,
            grid: styles.grid,
          }}
        />
        <VictoryAxis
          dependentAxis
          tickLabelComponent={<VictoryLabel style={styles.axisLabel} />}
          style={{
            axis: styles.axis,
            grid: styles.grid,
          }}
          tickFormat={(y) => _.round(y, 2)}
        />
        {fields.map((field, index) => (
          <VictoryLine
            key={field.id}
            interpolation="monotoneX"
            name="line"
            style={{
              data: {
                stroke: presetColors[index],
                strokeWidth: 2.5,
              },
            }}
            data={getData(field.key)}
          />
        ))}
      </VictoryChart>
      <View style={styles.absoluteFill}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  axisLabel: {
    fill: '#b3bccd',
    fontSize: 10,
  },
  axis: {
    stroke: '#b3bccd',
    opacity: 1,
  },
  grid: {
    stroke: '#b3bccd',
    opacity: 0.12,
    strokeWidth: 0.5,
  },
  absoluteFill: {
    zIndex: 999,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export { TimeSeriesWidget };
