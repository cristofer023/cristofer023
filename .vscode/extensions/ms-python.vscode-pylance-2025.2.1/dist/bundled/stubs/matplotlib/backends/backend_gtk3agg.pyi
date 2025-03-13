from . import backend_agg, backend_gtk3
from .backend_gtk3 import _BackendGTK3

class FigureCanvasGTK3Agg(backend_gtk3.FigureCanvasGTK3, backend_agg.FigureCanvasAgg):
    def __init__(self, figure) -> None: ...
    def on_draw_event(self, widget, ctx) -> bool: ...
    def blit(self, bbox=...) -> None: ...
    def draw(self) -> None: ...

class FigureManagerGTK3Agg(backend_gtk3.FigureManagerGTK3): ...

class _BackendGTK3Cairo(_BackendGTK3):
    FigureCanvas = FigureCanvasGTK3Agg
