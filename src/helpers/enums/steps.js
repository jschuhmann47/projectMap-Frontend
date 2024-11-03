import { onCreate as onCreateFoda } from 'redux/actions/foda.actions';
import { onCreate as onCreatePestel } from 'redux/actions/pestel.actions';
import { onCreate as onCreateMckinsey } from 'redux/actions/mckinsey.actions';
import { onCreate as onCreateAnsoff } from 'redux/actions/ansoff.actions';
import { onCreate as onCreatePorter } from 'redux/actions/porter.actions';
import { onCreateTool as onCreateOkr } from 'redux/actions/okr.actions';
import { onCreate as onCreateBalanced } from 'redux/actions/balanceScorecard.actions';
import { onCreate as onCreateQuestionnarie } from 'redux/actions/questionnarie.actions';
import { onCreate as onCreatePdca } from 'redux/actions/pdca.actions';
import { horizonOptions as okrHorizonOptions } from './okr';
import { horizonOptions as bscHorizonOptions } from './balanced';


export const StepValue = {
  EVALUACION_ENTORNO_EXTERNO: 1,
  EVALUACION_SITUACION_INTERNA: 2,
  DEFINICION_LINIAMIENTOS_ESTRATEGICOS: 3,
  FORMULACION_ESTRATEGIA_COMPETITIVA: 4,
  DEFINICION_PLANES_TRANSFORMACION: 5,
  PLAN_FINANCIERO_MEDICION_RESULTADOS: 6,
  MEJORA_CONTINUA: 7,
};

export const Tools = {
  Porter: 'porter',
  Pestel: 'pestel',
  Foda: 'foda',
  Ansoff: 'ansoff',
  McKinsey: 'mckinsey',
  Questionnaires: 'questionnaires',
  BalacedScorecard: 'balanced-scorecards',
  Okr: 'okr-projects',
  Pdca: 'pdca',
}

export const StageByTool = {
   [Tools.Porter]: 'externalEnvironment',
   [Tools.Pestel]: 'externalEnvironment',
   [Tools.Foda]: 'internalSituation',
   [Tools.Ansoff]: 'strategicGuidelines',
   [Tools.McKinsey]: 'competitiveStrategy',
   [Tools.Questionnaires]: 'transformationPlans',
   [Tools.Okr]: 'financialPlanning',
   [Tools.BalacedScorecard]: 'financialPlanning',
   [Tools.Pdca]: 'continuousImprovement',
}

export const STEPS = [
  {
    value: StepValue.EVALUACION_ENTORNO_EXTERNO,
    title: 'Evaluación del Entorno Externo',
    menuItems: [
      { titulo: 'Agregar Análisis de Porter', key: 1, action: onCreatePorter, toolName: Tools.Porter },
      { titulo: 'Agregar Análisis PESTEL', key: 2, action: onCreatePestel, toolName: Tools.Pestel },
    ],
    id: 'externalEnvironment',
    color: '#fcf281',
    description: `
      Consiste en evaluar diversos factores externos a la organización o emprendimiento que pueden influir en su funcionamiento. Estos factores pueden ser de naturaleza política, económica, sociocultural, tecnológica, ecológica o legal.
      <br><br>
      <b>PESTEL</b>
          El análisis PESTEL se utiliza para la planificación estratégica de una empresa, tanto a nivel organizacional como en el contexto del mercado. Realizar este análisis de manera regular permite identificar tendencias y cambios en el mercado que pueden impactar, positiva o negativamente, a su sector. Por esta razón, recomendamos llevar a cabo el análisis varias veces a lo largo del año.
      <br><br>
      <b>PORTER</b>
      El modelo de las 5 fuerzas de Porter es una herramienta metodológica que facilita la investigación sobre oportunidades y amenazas en una industria específica. Este análisis se basa en cinco ejes clave: 
      <br><br>

      1) Rivalidad entre competidores<br>
      2) Poder de negociación con los clientes<br>
      3) Poder de negociación con los proveedores<br>
      4) Amenaza de nuevos competidores<br>
      5) Amenaza de productos sustitutos 
    `
  },
  {
    value: StepValue.PLAN_FINANCIERO_MEDICION_RESULTADOS,
    title: 'Planeamiento Financiero y Medición de Resultados',
    menuItems: [
      { titulo: 'Agregar Balanced Scorecard', action: onCreateBalanced, horizon: bscHorizonOptions, requireStartDate: true,toolName: Tools.BalacedScorecard },
      {
        titulo: 'Agregar OKR',
        action: onCreateOkr,
        area: true,
        horizon: okrHorizonOptions,
        requireStartDate: true,
        parent: true,
        toolName: Tools.Okr
      },
    ],
    id: 'financialPlanning',
    color: '#fcb6d4',
    description: `
      Uno de los aspectos más cruciales en esta etapa es que la organización debe delinear y establecer cómo se medirán y distribuirán sus recursos para alcanzar los objetivos establecidos dentro de un plazo determinado.
      <br><br>
      <b>OKRs</b>
      Los OKR (Objectives and Key Results) son una metodología de gestión que facilita la definición y seguimiento de los objetivos de una empresa a través de mediciones tanto cuantitativas como cualitativas del progreso de los equipos. Esta herramienta puede marcar el rumbo de una organización, organizando el día a día de la compañía al definir grupos de trabajo y realizar un seguimiento de los avances de cada empleado.
      <br><br>
      <b>Balanced Scorecards</b>
      El Balanced Scorecard, o cuadro de mando integral, es una herramienta de gestión estratégica que se utiliza para definir y monitorear las estrategias de la organización. Su enfoque se basa en lograr un equilibrio adecuado entre los elementos de la estrategia general de la empresa y sus operaciones. Esto se logra mediante la definición de indicadores en cuatro perspectivas clave: financiera, del cliente, de procesos internos y de aprendizaje.
    `
  },
  {
    value: StepValue.EVALUACION_SITUACION_INTERNA,
    title: 'Evaluación de la Situación Interna',
    menuItems: [
      {
        titulo: 'Agregar Análisis FODA',
        action: onCreateFoda,
        toolName: Tools.Foda
      },
    ],
    id: 'internalSituation',
    color: '#aaed92',
    description: `
      Esta evaluación incluye un análisis de las competencias clave de la organización, así como de sus principales fuentes de diferenciación y sus mayores debilidades. 
      <br><br>
      <b>FODA</b> 
      El análisis FODA es una herramienta de planificación estratégica que permite realizar un examen interno (Fortalezas y Debilidades) y externo (Oportunidades y Amenazas) de la empresa. Es fundamental para la toma de decisiones tanto en el presente como en el futuro. 
      Esta herramienta es extremadamente valiosa para cualquier negocio, ya que proporciona información sobre lo que se está haciendo bien y los retos actuales o potenciales que se deben abordar.
    `,
  },
  {
    value: StepValue.MEJORA_CONTINUA,
    title: 'Mejora Continua',
    menuItems: [{ titulo: 'Agregar ciclo PDCA', action: onCreatePdca, toolName: Tools.Pdca }],
    id: 'continuousImprovement',
    color: '#febbbe',
    description: `
      La mejora continua es un enfoque estratégico que busca optimizar procesos, productos y servicios de manera constante para aumentar la eficiencia y la calidad dentro de una organización. Este enfoque se basa en la premisa de que siempre hay oportunidades para realizar ajustes y mejoras, lo que permite a las empresas adaptarse a cambios en el entorno, satisfacer mejor las necesidades de los clientes y mantener su competitividad en el mercado.
      <br><br>
      <b>PDCA</b>
      El ciclo PDCA (Plan-Do-Check-Act) es una herramienta fundamental en la gestión de la mejora continua. Este ciclo, que significa Planificar, Hacer, Verificar y Actuar, proporciona un marco estructurado para implementar cambios y evaluar su efectividad.
    `
  },
  {
    value: StepValue.DEFINICION_PLANES_TRANSFORMACION,
    title: 'Definición de los Planes de Transformación',
    menuItems: [
      { titulo: 'Agregar plan de transformación', action: onCreateQuestionnarie, toolName: Tools.Questionnaires },
    ],
    id: 'transformationPlans',
    color: '#d8c7ff',
    description: `
      Ninguna organización puede sobrevivir manteniéndose estática. Por ello, es fundamental definir planes de transformación que aborden el talento humano, la tecnología utilizada, los procesos operativos y la gestión de la comunicación, tanto interna como externa.
      <br><br>
      <b>Planes de transformación</b> 
      Los planes de transformación son estrategias que su empresa debe implementar para no quedarse atrás en cuanto a tendencias y nuevas culturas organizacionales que podrían mejorar tanto la calidad de su producto o servicio como el funcionamiento general de la organización. Para facilitar este proceso, ofrecemos una serie de cuestionarios acompañados de teoría pertinente para que usted los complete.
    `
  },
  {
    value: StepValue.DEFINICION_LINIAMIENTOS_ESTRATEGICOS,
    title: 'Definición de Lineamientos Estratégicos',
    menuItems: [{ titulo: 'Agregar Matriz Ansoff', action: onCreateAnsoff, toolName: Tools.Ansoff }],
    id: 'strategicGuidelines',
    color: '#86e6d9',
    description: `
      Esta etapa tiene como objetivo evaluar las posibles oportunidades que puede tener una organización, como nuevos negocios a explorar, la asignación de recursos o la posibilidad de fusiones. En ProjectMap, proporcionamos un análisis del producto en su respectivo mercado.
      <br><br>
      <b>Matriz Ansoff</b>
      La matriz Ansoff es una herramienta de análisis estratégico que se centra en identificar las oportunidades de crecimiento para una empresa. En nuestra implementación, nos enfocamos en desarrollar una solución para clasificar los productos según su estado y su posición en el mercado. Esta herramienta es crucial, ya que ofrece una visión comparativa de sus diferentes productos o servicios, ayudándole a identificar cuáles deben ser priorizados.
    `,
  },
  {
    value: StepValue.FORMULACION_ESTRATEGIA_COMPETITIVA,
    title: 'Formulación de la Estrategia Competitiva',
    menuItems: [
      { titulo: 'Agregar Matriz McKinsey', action: onCreateMckinsey, toolName: Tools.McKinsey },
    ],
    id: 'competitiveStrategy',
    color: '#9edcfa',
    description: `
      Esta etapa consiste en el diseño e implementación de planes y estrategias que definan las acciones necesarias para alcanzar sus objetivos tanto a corto como a largo plazo.
      <br><br>   
      <b>Matriz McKinsey</b>
      La matriz McKinsey evalúa el posicionamiento de un producto o servicio en el mercado y ayuda a determinar, en función de las condiciones competitivas y otros factores que pueden influir en su producción y distribución, si es conveniente mantener el producto en un mercado específico, invertir para crecer o, por el contrario, optar por una desinversión. El objetivo de esta herramienta es proporcionar información clave para optimizar la cartera de negocios de la mejor manera posible.
    `
  },
];

// remove ?
export const getMenuItems = (stepValue) =>
  Object.values(STEPS)?.find((step) => step.value === stepValue)?.menuItems ||
  [];

export const getMenuItemsBy = (stageNameId, toolName) =>
  Object.values(STEPS)?.find((step) => step.id === stageNameId)?.menuItems?.find(item => item.toolName == toolName) ||
  [];

  // Borrar ?
export const stepsInfo = {
  1: {
    title: 'Evaluación del Entorno Externo',
    description: `
      Consiste en evaluar diversos factores externos a la organización o emprendimiento que pueden influir en su funcionamiento. Estos factores pueden ser de naturaleza política, económica, sociocultural, tecnológica, ecológica o legal.
      <br><br>
      <b>PESTEL</b>
          El análisis PESTEL se utiliza para la planificación estratégica de una empresa, tanto a nivel organizacional como en el contexto del mercado. Realizar este análisis de manera regular permite identificar tendencias y cambios en el mercado que pueden impactar, positiva o negativamente, a su sector. Por esta razón, recomendamos llevar a cabo el análisis varias veces a lo largo del año.
      <br><br>
      <b>PORTER</b>
      El modelo de las 5 fuerzas de Porter es una herramienta metodológica que facilita la investigación sobre oportunidades y amenazas en una industria específica. Este análisis se basa en cinco ejes clave: 
      <br><br>

      1) Rivalidad entre competidores<br>
      2) Poder de negociación con los clientes<br>
      3) Poder de negociación con los proveedores<br>
      4) Amenaza de nuevos competidores<br>
      5) Amenaza de productos sustitutos 
    `,
  },
  2: {
    title: 'Evaluación de la Situación Interna',
    description: `
      Esta evaluación incluye un análisis de las competencias clave de la organización, así como de sus principales fuentes de diferenciación y sus mayores debilidades. 
      <br><br>
      <b>FODA</b> 
      El análisis FODA es una herramienta de planificación estratégica que permite realizar un examen interno (Fortalezas y Debilidades) y externo (Oportunidades y Amenazas) de la empresa. Es fundamental para la toma de decisiones tanto en el presente como en el futuro. 
      Esta herramienta es extremadamente valiosa para cualquier negocio, ya que proporciona información sobre lo que se está haciendo bien y los retos actuales o potenciales que se deben abordar.
    `,
  },
  3: {
    title: 'Definición de Lineamientos Estratégicos',
    description: `
      Esta etapa tiene como objetivo evaluar las posibles oportunidades que puede tener una organización, como nuevos negocios a explorar, la asignación de recursos o la posibilidad de fusiones. En ProjectMap, proporcionamos un análisis del producto en su respectivo mercado.
      <br><br>
      <b>Matriz Ansoff</b>
      La matriz Ansoff es una herramienta de análisis estratégico que se centra en identificar las oportunidades de crecimiento para una empresa. En nuestra implementación, nos enfocamos en desarrollar una solución para clasificar los productos según su estado y su posición en el mercado. Esta herramienta es crucial, ya que ofrece una visión comparativa de sus diferentes productos o servicios, ayudándole a identificar cuáles deben ser priorizados.
    `,
  },
  4: {
    title: 'Formulación de la Estrategia Competitiva',
    description: `
      Esta etapa consiste en el diseño e implementación de planes y estrategias que definan las acciones necesarias para alcanzar sus objetivos tanto a corto como a largo plazo.
      <br><br>   
      <b>Matriz McKinsey</b>
      La matriz McKinsey evalúa el posicionamiento de un producto o servicio en el mercado y ayuda a determinar, en función de las condiciones competitivas y otros factores que pueden influir en su producción y distribución, si es conveniente mantener el producto en un mercado específico, invertir para crecer o, por el contrario, optar por una desinversión. El objetivo de esta herramienta es proporcionar información clave para optimizar la cartera de negocios de la mejor manera posible.
    `,
  },
  5: {
    title: 'Definición de los Planes de Transformación',
    description: `
      Ninguna organización puede sobrevivir manteniéndose estática. Por ello, es fundamental definir planes de transformación que aborden el talento humano, la tecnología utilizada, los procesos operativos y la gestión de la comunicación, tanto interna como externa.
      <br><br>
      <b>Planes de transformación</b> 
      Los planes de transformación son estrategias que su empresa debe implementar para no quedarse atrás en cuanto a tendencias y nuevas culturas organizacionales que podrían mejorar tanto la calidad de su producto o servicio como el funcionamiento general de la organización. Para facilitar este proceso, ofrecemos una serie de cuestionarios acompañados de teoría pertinente para que usted los complete.
    `,
  },
  6: {
    title: 'Planeamiento Financiero y Medición de Resultados',
    description: `
      Uno de los aspectos más cruciales en esta etapa es que la organización debe delinear y establecer cómo se medirán y distribuirán sus recursos para alcanzar los objetivos establecidos dentro de un plazo determinado.
      <br><br>
      <b>OKRs</b>
      Los OKR (Objectives and Key Results) son una metodología de gestión que facilita la definición y seguimiento de los objetivos de una empresa a través de mediciones tanto cuantitativas como cualitativas del progreso de los equipos. Esta herramienta puede marcar el rumbo de una organización, organizando el día a día de la compañía al definir grupos de trabajo y realizar un seguimiento de los avances de cada empleado.
      <br><br>
      <b>Balanced Scorecards</b>
      El Balanced Scorecard, o cuadro de mando integral, es una herramienta de gestión estratégica que se utiliza para definir y monitorear las estrategias de la organización. Su enfoque se basa en lograr un equilibrio adecuado entre los elementos de la estrategia general de la empresa y sus operaciones. Esto se logra mediante la definición de indicadores en cuatro perspectivas clave: financiera, del cliente, de procesos internos y de aprendizaje.
    `,
  },
  7: {
    title: 'Mejora Continua',
    description: `
      La mejora continua es un enfoque estratégico que busca optimizar procesos, productos y servicios de manera constante para aumentar la eficiencia y la calidad dentro de una organización. Este enfoque se basa en la premisa de que siempre hay oportunidades para realizar ajustes y mejoras, lo que permite a las empresas adaptarse a cambios en el entorno, satisfacer mejor las necesidades de los clientes y mantener su competitividad en el mercado.
      <br><br>
      <b>PDCA</b>
      El ciclo PDCA (Plan-Do-Check-Act) es una herramienta fundamental en la gestión de la mejora continua. Este ciclo, que significa Planificar, Hacer, Verificar y Actuar, proporciona un marco estructurado para implementar cambios y evaluar su efectividad.
    `,
  },
};
