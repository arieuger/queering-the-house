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
  import addMarkerImage from '$lib/assets/add-marker.png';
  import { activeMarkerCoords } from '../stores';
  import type { FeatureCollection, GeoJsonProperties, Geometry, Point } from 'geojson';

  const { Map, NavigationControl, Popup, GeolocateControl } = maplibregl;
  const style = styleJson as StyleSpecification;

  let map: MapType;
  let mapContainer: HTMLDivElement;
  let isMomentLayerClicked = false;
  // 43.37246278091801, -8.404618701898668
  const initialState = { lng: -8.404618, lat: 43.372462, zoom: 13.5 };

  const markerHeight = 39;
  const markerId = 'moments';
  const markerLayerId = 'moments-layer';
  const markerHoveredLayerId = 'moments-hovered-layer';
  const activeMarkerSourceId = 'active-marker-source';
  const activeMarkerLayerId = 'active-marker-layer';

  const corunaDistricts: FeatureCollection<Geometry, GeoJsonProperties> = corunaDistrictsImport as FeatureCollection<Geometry, GeoJsonProperties>;

  const activeMarkerGeoJSON: FeatureCollection<Point, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: []
  };

  async function getMoment(id?: number | string) {
    try {
      const response = await fetch(`/moment/${id}`);
      const moment = await response.json();
      return moment;
    } catch (error) {
      console.error('Error fetching moment:', error);
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
      maxZoom: 18
    });

    map.fitBounds([
      [-8.543930, 43.300447],
      [-8.347893,43.399186]
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
          'line-color': '#dd4783',
          'line-width': 2,
          'line-opacity': 0.2
        },
      });
      
      const response = await fetch(`/moments`);
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
        source: 'moments',
        filter: ['has', 'point_count'], // Solo clústeres
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6', // Color para baja densidad
            10, '#f1f075', // Color para densidad media
            50, '#f28cb1' // Color para alta densidad
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            15, // Radio para baja densidad
            10, 20, // Radio para densidad media
            50, 25 // Radio para alta densidad
          ],
          'circle-opacity': 0.6 // Semitransparente
        }
      });

      // Capa para el número de puntos en cada clúster
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'moments',
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
          isMomentLayerClicked = true;
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

          getMoment(feature.id)
            .then((momentInfo) => {
              if (coordinates.length === 2) {
                new Popup({
                  offset: [0, -markerHeight],
                  anchor: 'bottom',
                  maxWidth: 'none'
                })
                  .setLngLat(coordinates as LngLatLike)
                  .setHTML(
                    '<b>Dirección:</b> ' + momentInfo.address + '<br>' +
                    '<b>Observacións:</b> ' + momentInfo.description + '<br>' +
                    '<b>Licencia:</b> ' + momentInfo.license + '<br>' +
                    '<b>Fonte/s:</b> ' + momentInfo.sources)
                  .addTo(map);
              } else {
                console.error('Invalid coordinates format');
              }
            })
            .catch((error) => {
              console.error('Error fetching moment:', error);
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
        if (isMomentLayerClicked) {
          isMomentLayerClicked = false;
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
