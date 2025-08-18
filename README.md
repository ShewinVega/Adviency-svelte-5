# Monitoreo de Svelte 5: Runas y Manejo de Estados

## Introducción
Este documento tiene como finalidad dejar constancia del proceso de monitoreo de **Svelte 5**, específicamente en lo relacionado con las *runas* . Se ha utilizado un proyecto práctico como referencia, orientado a la gestión de regalos de Navidad, con el objetivo de comprender cómo se aplican estos conceptos en un escenario real.

## Objetivo
El propósito principal de este seguimiento fue:
- Familiarizarme con la sintaxis y nuevas funcionalidades de Svelte 5.
- Comprender el uso de *runas*.
- Analizar cómo las reactividades automáticas permiten una programación más clara y concisa.

## Monitoreo de Svelte 5
Durante el proceso se exploró cómo las *runas* introducen un paradigma más expresivo en comparación con versiones anteriores de Svelte. Aunque no se explica cada runa en detalle, se documenta el uso de **$state** y **$effect** como parte fundamental del manejo de datos reactivos.

Ejemplo en el proyecto de referencia:

```ts
let gifts = $state<Gift[]>([]);
let gift = $state<Partial<Gift>>(structuredClone(INITIAL_GIFT));
let showModal = $state<boolean>(false);
let totalPrice = $state<number>(0);

$effect(() => {
  totalPrice = gifts.reduce(
    (acc: number, current: Gift) => acc + (current.quantity * current.price), 
    0
  );
});