import { ChangeEvent, useMemo, useState } from 'react';
import {
  ArrowRight, Check, ChevronDown, Download, ImagePlus, LayoutTemplate,
  Link2, Palette, Sparkles, Type, Upload, WandSparkles, X
} from 'lucide-react';

const referenceImage = '/reference-visual.png';

const templates = [
  { id: 'editorial', label: 'Editorial', note: 'Tipografía + imagen' },
  { id: 'minimal', label: 'Minimal', note: 'Espacios y jerarquía' },
  { id: 'bold', label: 'Bold', note: 'Titulares de impacto' },
];

export default function App() {
  const [reference, setReference] = useState<string>(referenceImage);
  const [referenceName, setReferenceName] = useState('Referencia visual');
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('4:5');
  const [slides, setSlides] = useState(7);
  const [selectedTemplate, setSelectedTemplate] = useState('editorial');
  const [step, setStep] = useState(1);
  const [generated, setGenerated] = useState(false);

  const onReferenceUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setReference(URL.createObjectURL(file));
    setReferenceName(file.name);
  };

  const status = useMemo(() => generated ? 'Carrusel generado' : 'Listo para analizar', [generated]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">B</span><div><strong>Editorial</strong><small>Social AI</small></div></div>
        <nav>
          {['Nuevo proyecto', 'Mis proyectos', 'Brand System', 'Plantillas', 'Historial'].map((item, i) => (
            <button className={i === 0 ? 'nav-item active' : 'nav-item'} key={item}>{item}</button>
          ))}
        </nav>
        <div className="sidebar-bottom"><span className="avatar">MD</span><div><strong>Mi espacio</strong><small>Configuración</small></div><ChevronDown size={15}/></div>
      </aside>

      <section className="workspace">
        <header className="topbar"><div><span className="eyebrow">NUEVO PROYECTO</span><h1>Convierte una noticia en una historia visual</h1></div><div className="status"><span className="dot" /> {status}</div></header>

        <div className="steps">
          {['Artículo', 'Referencia visual', 'Estilo', 'Generar'].map((label, i) => (
            <div className={step >= i + 1 ? 'step current' : 'step'} key={label}><span>{i + 1}</span>{label}</div>
          ))}
        </div>

        <div className="content-grid">
          <section className="config-card">
            <div className="card-heading"><div><span className="section-kicker">01 / CONTENIDO</span><h2>¿Qué quieres contar?</h2><p>Introduce la URL y analizaremos el artículo antes de diseñar.</p></div><Link2 size={20}/></div>
            <label className="field-label">URL DEL ARTÍCULO</label>
            <div className="url-input"><Link2 size={17}/><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://www.ejemplo.com/noticia..."/><button onClick={() => setStep(2)}>Analizar <ArrowRight size={16}/></button></div>

            <div className="divider" />
            <div className="card-heading compact"><div><span className="section-kicker">02 / REFERENCIA</span><h2>Define el lenguaje visual</h2><p>Sube una pieza que represente el estilo que quieres replicar como sistema, no como copia.</p></div><Palette size={20}/></div>
            <label className="reference-drop">
              {reference ? <img src={reference} alt="Referencia visual" /> : <div className="upload-placeholder"><ImagePlus size={32}/><strong>Arrastra una referencia visual</strong><span>PNG, JPG o WEBP</span></div>}
              <div className="reference-overlay"><Upload size={16}/><span>Cambiar referencia</span></div>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onReferenceUpload}/>
            </label>
            <div className="reference-meta"><div><strong>{referenceName}</strong><span>Analizará composición, color, tipografía, ritmo y tratamiento fotográfico.</span></div><button onClick={() => {setReference(''); setReferenceName('Sin referencia')}}><X size={16}/></button></div>

            <div className="divider" />
            <div className="card-heading compact"><div><span className="section-kicker">03 / SISTEMA</span><h2>Configura la salida</h2></div><LayoutTemplate size={20}/></div>
            <div className="controls-row">
              <div className="control"><label>FORMATO</label><div className="segmented">{['1:1','4:5','9:16'].map(v => <button key={v} className={format === v ? 'selected' : ''} onClick={() => setFormat(v)}>{v}</button>)}</div></div>
              <div className="control"><label>SLIDES</label><div className="number-control"><button onClick={() => setSlides(Math.max(3, slides - 1))}>−</button><strong>{slides}</strong><button onClick={() => setSlides(Math.min(12, slides + 1))}>+</button></div></div>
            </div>
          </section>

          <aside className="preview-card">
            <div className="preview-header"><div><span className="section-kicker">REFERENCIA VISUAL</span><h3>Tu dirección creativa</h3></div><span className="ai-chip"><Sparkles size={13}/> AI Ready</span></div>
            <div className="reference-preview">{reference ? <img src={reference} alt="Vista previa de referencia"/> : <div className="empty-ref"><ImagePlus size={30}/><span>Sin referencia visual</span></div>}</div>
            <div className="insights"><div><span>PALETA</span><div className="swatches"><i/><i/><i/><i/></div></div><div><span>ESTILO</span><strong>Editorial contemporáneo</strong></div><div><span>COMPOSICIÓN</span><strong>Grid modular · tipografía dominante</strong></div></div>
            <div className="divider" />
            <div className="preview-header"><div><span className="section-kicker">TEMPLATE SYSTEM</span><h3>Selecciona una dirección</h3></div><Type size={18}/></div>
            <div className="template-list">{templates.map(t => <button key={t.id} className={selectedTemplate === t.id ? 'template selected' : 'template'} onClick={() => setSelectedTemplate(t.id)}><span className="template-thumb">{t.id === 'bold' ? 'Aa' : t.id === 'minimal' ? '—' : 'A'}</span><span><strong>{t.label}</strong><small>{t.note}</small></span>{selectedTemplate === t.id && <Check size={16}/>}</button>)}</div>
            <button className="generate" onClick={() => {setGenerated(true); setStep(4)}}><WandSparkles size={18}/> Generar propuesta <ArrowRight size={17}/></button>
          </aside>
        </div>

        {generated && <section className="result-strip"><div><span className="section-kicker">GENERACIÓN COMPLETADA</span><h2>{slides} slides · {format} · {templates.find(t => t.id === selectedTemplate)?.label}</h2><p>Content Brief → Design Brief → composición editorial lista para editar.</p></div><button><Download size={16}/> Exportar</button></section>}
      </section>
    </main>
  );
}
