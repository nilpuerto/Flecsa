import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, Camera, FileText, Lightbulb, Eye, Frame } from "lucide-react";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const processDocument = () => {
    if (selectedFile) {
      // Store file info in localStorage for demo
      localStorage.setItem('currentDocument', JSON.stringify({
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        id: Date.now().toString()
      }));
      navigate('/app/process');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Sube o haz una foto
          </h1>
          <p className="text-xl text-muted-foreground">
            Selecciona un documento para que la IA lo organice automáticamente
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-primary bg-primary-light"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="scale-in">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-medium mb-4"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                  <p className="text-lg font-medium text-foreground mb-2">{selectedFile.name}</p>
                  <p className="text-muted-foreground mb-4">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                      }}
                      className="btn-secondary"
                    >
                      Cambiar archivo
                    </button>
                    <button onClick={processDocument} className="btn-hero">
                      Procesar documento
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadIcon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Arrastra archivos aquí
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    O selecciona archivos desde tu dispositivo
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-hero flex items-center gap-2"
                    >
                      <UploadIcon className="w-5 h-5" />
                      Subir archivo
                    </button>
                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Hacer foto
                    </button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    Formatos soportados: JPG, PNG, PDF (máx. 20MB)
                  </p>
                </div>
              )}
            </div>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileInput}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Tips Panel */}
          <div className="card-soft slide-in-right">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Consejos para mejores resultados</h3>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Eye className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Usa buena luz</p>
                  <p className="text-muted-foreground">Evita sombras y asegúrate de que el texto sea legible</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Frame className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Enmarca bien el documento</p>
                  <p className="text-muted-foreground">Incluye todo el contenido y evita cortar texto importante</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Camera className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Evita reflejos</p>
                  <p className="text-muted-foreground">Inclina ligeramente el documento si hay brillos</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-light rounded-lg">
              <p className="text-sm text-primary font-medium">
                💡 ¿Sabías que puedes subir múltiples páginas del mismo documento?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;