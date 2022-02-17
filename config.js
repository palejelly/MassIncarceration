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
                zoom: 7.1,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {layer: 'census', opacity: 0 },
                {layer: 'major_industry', opacity: 1.0},
                {layer: 'prison_text', opacity: 1 },
                {layer: 'prison', opacity: 0.8 },
                {layer: 'satellite', opacity: 0.5 },
                {layer: 'Historical_population', opacity:0 },
                {layer: 'Population_at_closing', opacity:0 },
                {layer: 'Population_at_opening', opacity:0 },
            ],

            onChapterExit: [
              
            ]
        },
        {
            id: 'chapter2',
            alignment: 'fixed_left',
            title: 'Hitorical Population (1870)',
            image: 'src/Bar Graph - 1870.png',
            description: '',
            location: {
                center: [-75.922,42.347],
                zoom: 7.1,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {layer: 'census', opacity: 0 },
                {layer: 'major_industry', opacity: 0},
                {layer: 'prison_text', opacity: 1 },
                {layer: 'prison', opacity: 0.8 },
                {layer: 'satellite', opacity: 0.5 },
                {layer: 'Historical_population', opacity:1.0 },
                {layer: 'Population_at_closing', opacity:0 },
                {layer: 'Population_at_opening', opacity:0 },
            ],

            onChapterExit: [
              
            ]
        },
        {
            id: 'chapter3',
            alignment: 'fixed_left',
            title: 'Historical Population at Opening',
            image: 'src/Bar Graph - Opening.png',
            description: 'uam erat volutpat. Sed ullamcorper convallis eros ut auctor. Cras vel iaculis ligula, et vestibulum metus.',
            location: {
                center: [-75.922,42.347],
                zoom: 7.1,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {layer: 'census', opacity: 0 },
                {layer: 'major_industry', opacity: 0},
                {layer: 'prison_text', opacity: 1 },
                {layer: 'prison', opacity: 0.8 },
                {layer: 'satellite', opacity: 0.5 },
                {layer: 'Historical_population', opacity:0 },
                {layer: 'Population_at_closing', opacity:0 },
                {layer: 'Population_at_opening', opacity:1.0 },
            ],
            onChapterExit: [
              
            ]
        },
        {
            id: 'chapter4',
            alignment: 'fixed_left',
            title: 'Historical Population at Closing',
            image: 'src/Bar Graph - Closing.png',
            description: 'uam erat volutpat. Sed ullamcorper convallis eros ut auctor. Cras vel iaculis ligula, et vestibulum metus.',
            location: {
                center: [-75.922,42.347],
                zoom: 7.1,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {layer: 'census', opacity: 0 },
                {layer: 'major_industry', opacity: 0},
                {layer: 'prison_text', opacity: 1 },
                {layer: 'prison', opacity: 0.8 },
                {layer: 'satellite', opacity: 0.5 },
                {layer: 'Historical_population', opacity:0 },
                {layer: 'Population_at_closing', opacity:1.0 },
                {layer: 'Population_at_opening', opacity:0 },
            ],
            onChapterExit: [
              
            ]
        },
        {
            id: 'chapter5',
            alignment: 'fixed_left',
            title: 'Industry',
            image: '',
            description: 'uam erat volutpat. Sed ullamcorper convallis eros ut auctor. Cras vel iaculis ligula, et vestibulum metus.',
            location: {
                center: [-75.922,42.347],
                zoom: 7.1,
                pitch: 0,
                bearing: 0.00
            },
            onChapterEnter: [
                {layer: 'census', opacity: 0 },
                {layer: 'major_industry', opacity: 1.0},
                {layer: 'prison_text', opacity: 0.0 },
                {layer: 'prison', opacity: 0.8 },
                {layer: 'satellite', opacity: 0.5 },
                {layer: 'Historical_population', opacity:0 },
                {layer: 'Population_at_closing', opacity:0 },
                {layer: 'Population_at_opening', opacity:0 },
            ],
            onChapterExit: [
              
            ]
        },
    ]
};
