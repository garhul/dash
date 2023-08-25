import { timeSeriesSubset, timeSeriesSubsetKey } from "@dash/sharedTypes";
import { useState } from "react";
import { Row, Col, Badge, Container, ButtonGroup, Button } from "react-bootstrap";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { WiThermometer, WiHumidity, WiBarometer, WiLightning, WiAlien } from "react-icons/wi";
import ElapsedTimeBadge from "./ElapsedTimeBadge";
import LabelControl from "./LabelControl";
import Plot from "./Plot";

export type sensorProps = {
  channels: [
    { icon: string, key: string, color: string, unit: string }
  ];
  data: { key: string, series: timeSeriesSubset[] }[];
  lastSeen: number;
}

export type sensorChannelProps = {
  channelSeries: timeSeriesSubset | null;
  channelKey: string;
  icon: string;
  unit: string;
  color: string;
}

type plotButtonRowProps = {
  onDomainChange: (domain: timeSeriesSubsetKey) => void;
  domain: timeSeriesSubsetKey;
}

function getIcon(icon: string) {
  switch (icon) {
    case 'TEMP':
      return <WiThermometer style={{ "fontSize": "5vh" }} />

    case 'HUMID':
      return <WiHumidity style={{ "fontSize": "5vh" }} />

    case 'PRES':
      return <WiBarometer style={{ "fontSize": "5vh" }} />

    case 'BAT':
      return <WiLightning style={{ "fontSize": "5vh" }} />

    default:
      return <WiAlien style={{ "fontSize": "5vh" }} />
  }
}

function SensorChannel({ channelSeries, channelKey, icon, unit, color }: sensorChannelProps) {

  if (channelSeries === null) {
    return (
      <Row className="sensor_row" key={`chann_${channelKey}`}>
        <LabelControl>Channel data not available</LabelControl>
      </Row>
    );
  }

  const plotData = channelSeries.series.map(datapoint => ({ t: datapoint[0] * 1000, v: datapoint[1] / 1000 }));

  return (
    <Row className="sensor_row" key={`chann_${channelKey}`}>
      <Row>
        <Col xs="auto">
          <h2>{getIcon(icon)} {(channelSeries.extras.last !== null) ? (channelSeries.extras.last / 1000).toFixed(2) : 'NA'} <small>{unit}</small></h2>
        </Col>
        <Col xs="auto">
          <Row>
            <Col><FiArrowUp style={{ "fontSize": "2vh" }} /></Col>
            <Col>
              <Badge bg="dark" style={{ "fontSize": "1.5vh" }}>
                {(channelSeries.extras.max !== null) ? (channelSeries.extras.max / 1000).toFixed(2) : 'NA'}
              </Badge>
            </Col>
          </Row>
          <Row>
            <Col><FiArrowDown style={{ "fontSize": "2vh" }} /></Col>
            <Col>
              <Badge bg="dark" style={{ "fontSize": "1.5vh" }}>
                {(channelSeries.extras.min !== null) ? (channelSeries.extras.min / 1000).toFixed(2) : 'NA'}
              </Badge>
            </Col>
          </Row>
        </Col>
      </Row>
      <Plot
        unit={unit}
        color={color}
        data={plotData}
        min={(channelSeries.extras.min !== null) ? (channelSeries.extras.min / 1000) : 0}
        max={(channelSeries.extras.max !== null) ? (channelSeries.extras.max / 1000) : 0}
        intervalWindow={channelSeries.timeWindow}
      />
    </Row>)
}

function PlotButtonRow({ domain, onDomainChange }: plotButtonRowProps) {
  return (<Row className="plot-buttons">
    <ButtonGroup aria-label="timescales">
      <Button variant={(domain === 'Year') ? 'outline-warning' : 'outline-secondary'} onClick={() => { onDomainChange('Year') }} >last Year</Button>
      <Button variant={(domain === 'Month') ? 'outline-warning' : 'outline-secondary'} onClick={() => { onDomainChange('Month') }} >last 30d</Button>
      <Button variant={(domain === 'Week') ? 'outline-warning' : 'outline-secondary'} onClick={() => { onDomainChange('Week') }} >last 7d</Button>
      <Button variant={(domain === 'Day') ? 'outline-warning' : 'outline-secondary'} onClick={() => { onDomainChange('Day') }} >last 24h</Button>
      <Button variant={(domain === 'Immediate') ? 'outline-warning' : 'outline-secondary'} onClick={() => { onDomainChange('Immediate') }} >instant</Button>
    </ButtonGroup>
  </Row>);
}

export default function Sensor({ lastSeen, channels, data }: sensorProps) {
  const [domain, setDomain] = useState<timeSeriesSubsetKey>('Immediate');

  const plotChannels = channels.map(channel => (
    <SensorChannel key={`sensor_${channel.key}`}
      channelSeries={data.find(subset => subset.key === channel.key)?.series.find(s => s.key === domain) || null}
      icon={channel.icon}
      channelKey={channel.key}
      unit={channel.unit}
      color={channel.color}
    />));

  return (
    <Container>
      {plotChannels}
      <PlotButtonRow onDomainChange={setDomain} domain={domain} />
      <ElapsedTimeBadge lastSeen={lastSeen} />
    </Container>
  )
}