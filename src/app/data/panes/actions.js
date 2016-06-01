/**
 * The actions pane
 */

export default {
  key: 'actions',
  lineSpacing: 16,
  buttonKey: 'actions',
  font: {
    font: '12px RainfallBlack',
    fontSize: `12px`,
    fontFamily: 'RainfallBlack',
    fill: '#FFFFFF',
    stroke: '#000000',
    strokeThickness: 2,
    wordWrap: true,
    wordWrapWidth: 150,
    align: 'center'
  },
  layout: {
    container: {
      x: '5%',
      y: '5%',
      width: '33%',
      height: '100%'
    },
    element: {
      width: '40%',
      height: '33%',
      padding: 12
    }
  },
  items: [
    {
      text: 'Look',
      key: null,
      frame: null,
      action: {
        any: {
          mode: 'look'
        }
      }
    },
    {
      text: 'Pick up',
      key: null,
      frame: null,
      action: {
        any: {
          mode: 'take'
        }
      }
    },
    {
      text: 'Walk to',
      key: null,
      frame: null,
      action: {
        any: {
          mode: 'move'
        }
      }
    },
    {
      text: 'Speak to',
      key: null,
      frame: null,
      action: {
        any: {
          mode: 'speak'
        }
      }
    },
    {
      text: 'Use',
      key: null,
      frame: null
    },
    {
      text: 'Push',
      key: null,
      frame: null
    }
  ]
}
