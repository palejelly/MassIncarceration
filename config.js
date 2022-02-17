var config = {
    style: 'mapbox://styles/palejelly/ckzhcozoc000y14rvs1dgw2ro',
    accessToken: 'pk.eyJ1IjoicGFsZWplbGx5IiwiYSI6ImNrejhua2FvMzFtaTcyd3AxbTZ1M3ZxdmEifQ.UCz4YzJg9PHy9AgB1G_NMQ',
    showMarkers: false,
    theme: 'light',
    title: '',
    subtitle: '',
    byline: '',
    footer: '',
    chapters: [
        {
            id: 'chapter1',
            alignment: 'right',
            title: 'History of Mass incarceration',
            image: '',
            description: 'Facts about prisons nyc',
            location: {
                center: [-75.922,42.347],
                zoom: 7.3,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {layer: 'food', opacity: 0 },
                {layer: 'census', opacity: 0 },
                {layer: 'prison_text', opacity: 1 },
                {layer: 'prison', opacity: 0.0 },
                {layer: 'satellite', opacity:0.5 },
            ],
            onChapterExit: [
              
            ]
        },
        {
            id: 'chapter2',
            alignment: 'left',
            title: 'System Diagram',
            image: '',
            description: 'uam erat volutpat. Sed ullamcorper convallis eros ut auctor. Cras vel iaculis ligula, et vestibulum metus.',
            location: {
                center: [-75.922,42.347],
                zoom: 7.3,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {layer: 'food', opacity: 0 },
                {layer: 'census', opacity: 1 },
                {layer: 'prison_text', opacity: 1.0 },
                {layer: 'prison', opacity:0 },
                {layer: 'satellite', opacity:0.0 },
            ],
            onChapterExit: [
              
            ]
        },
        {
            id: 'chapter3',
            alignment: 'right',
            title: 'Chapter 3',
            image: 'images/9_2420_Cattlyst_Vig1.jpg',
            description: 'uam erat volutpat. Sed ullamcorper convallis eros ut auctor. Cras vel iaculis ligula, et vestibulum metus.',
            location: {
                center: [-75.922,42.347],
                zoom: 7.3,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {layer: 'food', opacity: 1 },
                {layer: 'census', opacity: 0 },
                {layer: 'prison_text', opacity: 0.0 },
                {layer: 'prison', opacity:1.0 },
                {layer: 'satellite', opacity:0.5 },
            ],
            onChapterExit: [
              
            ]
        }
    ]
};
