<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import maplibregl, {
    type GeoJSONSource,
    type LngLatLike,
    type Map as MapType,
    type MapGeoJSONFeature,
    type MapMouseEvent,
    type StyleSpecification
  } from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import markerImage from '$lib/assets/marker.png';
  import markerHoveredImage from '$lib/assets/marker-hovered.png';
  import styleJson from '$lib/data/pmtiles/style.json';
  import corunaDistrictsImport from '$lib/data/coruna-distritos.json';
  import corunaShapeImport from '$lib/data/coruna-shape.json';
  import addMarkerImage from '$lib/assets/add-marker.png';
  import { activeMarkerCoords } from '../stores';
  import type { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
  import * as martinez from 'martinez-polygon-clipping';

  const { Map, NavigationControl, Popup, GeolocateControl } = maplibregl;
  const style = styleJson as StyleSpecification;

  let map: MapType;
  let mapContainer: HTMLDivElement;
  let isHouseLayerClicked = false;
  // 43.37246278091801, -8.404618701898668
  const initialState = { lng: -8.404618, lat: 43.372462, zoom: 13.5 };

  const markerHeight = 39;
  const markerId = 'houses';
  const markerLayerId = 'houses-layer';
  const markerHoveredLayerId = 'houses-hovered-layer';
  const activeMarkerSourceId = 'active-marker-source';
  const activeMarkerLayerId = 'active-marker-layer';

  const corunaDistricts: FeatureCollection = corunaDistrictsImport as FeatureCollection;

  const activeMarkerGeoJSON: FeatureCollection<Point, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: []
  };

  const worldBoundsCoords = [
    [
      [-180, -90],
      [180, -90],
      [180, 90],
      [-180, 90],
      [-180, -90]
    ]
  ];


  async function getHouse(id?: number | string) {
    try {
      const response = await fetch(`/house/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching house:', error);
      return '';
    }
  }

  async function loadImageAndAddToMap(
    map: MapType,
    imageUrl: string,
    imageId: string
  ) {
    try {
      const image = await map.loadImage(imageUrl);
      map.addImage(imageId, image.data);
    } catch (error) {
      console.error(`Error loading image (${imageUrl}):`, error);
    }
  }

  function addPinLayer(
    map: MapType,
    layerId: string,
    sourceId: string,
    iconImage: string,
    paint: object = {}
  ) {
    map.addLayer({
      id: layerId,
      type: 'symbol',
      source: sourceId,
      layout: {
        'icon-allow-overlap': true,
        'icon-image': iconImage,
        'icon-size': 0.45,
        'icon-anchor': 'bottom'
      },
      filter: ['!', ['has', 'point_count']],
      paint: paint
    });
  }

  onMount(() => {


    map = new Map({
      container: mapContainer,
      style: style,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      minZoom: 3,
      maxZoom: 18,
      maxBounds: [[-8.564529,43.235198], [-8.291588,43.437465]]
    });

    map.fitBounds([
        [-8.472691,43.300072],
        [-8.375874,43.396566]
    ]);

    map.addControl(
      new NavigationControl({ showCompass: false }),
      'bottom-right'
    );
    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        }
      }),
      'bottom-right'
    );
    map.keyboard.enable();

    map.on('load', async () => {

      map.addSource('corunaAdminDivision', {
        type: 'geojson',
        data: corunaDistricts,
      });

      map.addLayer({
        id: 'coruna-admin-layer',
        type: 'line',
        source: 'corunaAdminDivision',
        paint: {
          'line-color': '#80e0a7',
          'line-width': 2,
          'line-opacity': 0.2
        },
      });

      const corunaShapeCoords = corunaShapeImport.geometry.coordinates;
      const differenceCoords = martinez.diff(worldBoundsCoords, corunaShapeCoords);
      const maskShape : Feature = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: differenceCoords[0]
        },
        properties: {}
      } as Feature;

      map.addSource('maskShape', {
        type: 'geojson',
        data: maskShape,
      });

      map.addLayer({
        id: 'mask-layer',
        type: 'fill',
        source: 'maskShape',
        paint: {
          'fill-color': '#2b4a37',
          'fill-opacity': 0.3,
        },
      });


      const response = await fetch(`/houses`);
      const geoJSONData = await response.json();
      
      if (geoJSONData) {
        map.addSource(markerId, {
          type: 'geojson',
          data: geoJSONData,
          cluster: true, // Habilitar clustering
          clusterMaxZoom: 16, // Nivel máximo de zoom para clustering
          clusterRadius: 100 // Radio de clustering en píxeles
        });
      }

      try {
        await loadImageAndAddToMap(map, markerImage, 'marker');
        await loadImageAndAddToMap(map, markerHoveredImage, 'marker-hovered');
        await loadImageAndAddToMap(map, addMarkerImage, 'add-marker');
      } catch (error) {
        console.error('Error loading marker images:', error);
      }

      // Capa para los clústeres
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'houses',
        filter: ['has', 'point_count'], // Solo clústeres
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#46dd64', // Color para baja densidad
            10, '#ea7e66', // Color para densidad media
            40, '#e33163' // Color para alta densidad
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            15, // Radio para baja densidad
            10, 20, // Radio para densidad media
            40, 25 // Radio para alta densidad
          ],
          'circle-opacity': 0.6 // Semitransparente
        }
      });

      // Capa para el número de puntos en cada clúster
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'houses',
        filter: ['has', 'point_count'], // Solo clústeres
        layout: {
          'text-field': '{point_count_abbreviated}', // Número abreviado
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });



      addPinLayer(map, markerLayerId, markerId, 'marker');
      addPinLayer(map, markerHoveredLayerId, markerId, 'marker-hovered', {
        'icon-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0
        ]
      });

      map.addSource(activeMarkerSourceId, {
        type: 'geojson',
        data: activeMarkerGeoJSON
      });
      addPinLayer(map, activeMarkerLayerId, activeMarkerSourceId, 'add-marker');

      map.on(
        'click',
        markerLayerId,
        function (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) {
          isHouseLayerClicked = true;
          if (!e.features || e.features.length === 0) {
            return;
          }

          const feature = e.features[0];
          if (feature.geometry.type !== 'Point') {
            return;
          }

          const coordinates = (feature.geometry as Point).coordinates;
          if (typeof feature.id !== 'number') {
            console.error('Invalid feature id:', feature.id);
            return;
          }

          getHouse(feature.id)
            .then((houseInfo) => {
              if (coordinates.length === 2) {
                new Popup({
                  offset: [0, -markerHeight],
                  anchor: 'bottom',
                  maxWidth: 'none'
                })
                  .setLngLat(coordinates as LngLatLike)
                  .setHTML(
                    '<b>Dirección:</b> ' + houseInfo.address + '<br>' +
                    '<b>Observacións:</b> ' + houseInfo.description + '<br>' +
                    '<b>Licencia:</b> ' + houseInfo.license + '<br>' +
                    '<b>Fonte/s:</b> ' + houseInfo.sources)
                  .addTo(map);
              } else {
                console.error('Invalid coordinates format');
              }
            })
            .catch((error) => {
              console.error('Error fetching house:', error);
            });
        }
      );

      let hoveredFeatureId: number | null = null;

      const pointerHoverHandler = (
        e: MapMouseEvent & { features?: MapGeoJSONFeature[] }
      ) => {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features && e.features.length > 0) {
          const newHoveredFeatureId = e.features[0].id as number;
          if (
            hoveredFeatureId !== null &&
            hoveredFeatureId !== newHoveredFeatureId
          ) {
            map.setFeatureState(
              { source: markerId, id: hoveredFeatureId },
              { hover: false }
            );
          }
          hoveredFeatureId = newHoveredFeatureId;
          map.setFeatureState(
            { source: markerId, id: hoveredFeatureId },
            { hover: true }
          );
        }
      };
      map.on('mouseenter', markerLayerId, pointerHoverHandler);
      map.on('mousemove', markerLayerId, pointerHoverHandler);

      map.on('mouseleave', markerLayerId, function () {
        map.getCanvas().style.cursor = '';
        if (hoveredFeatureId !== null) {
          map.setFeatureState(
            { source: markerId, id: hoveredFeatureId },
            { hover: false }
          );
          hoveredFeatureId = null;
        }
      });

      map.on('click', (e: MapMouseEvent) => {
        if (isHouseLayerClicked) {
          isHouseLayerClicked = false;
          return;
        }

        const { lng, lat } = e.lngLat;
        activeMarkerCoords.set({ lng, lat });
      });
    });
  });

  $: {
    if ($activeMarkerCoords) {
      activeMarkerGeoJSON.features = [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [$activeMarkerCoords.lng, $activeMarkerCoords.lat]
          },
          properties: {}
        }
      ];

      const source = map?.getSource(activeMarkerSourceId) as GeoJSONSource;
      if (source) {
        source.setData(activeMarkerGeoJSON);
      }
    }
  }

  onDestroy(() => {
    if (map) {
      map.remove();
    }
  });
</script>

<div id="map" bind:this={mapContainer}></div>

<style>
  #map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
