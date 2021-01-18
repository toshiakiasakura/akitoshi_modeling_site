import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
import matplotlib.dates as mdates

import numpy as np
import pandas as pd

bar_args = dict(width=1,linewidth=0.1,edgecolor="black",color="lightblue")

class BasicPlot():
    def __init__(self, xlim=None, ylim=None, xlabel="", ylabel="",title="",tight=True,
            save_path=None, figsize=(5,3), dpi=150):
        self.fig = plt.figure(figsize=figsize,dpi=dpi)
        self.ax = self.fig.add_subplot(111)
        self.ax.set_xlabel(xlabel)
        self.ax.set_ylabel(ylabel)
        self.ax.set_xlim(xlim) if xlim else None
        self.ax.set_ylim(ylim) if ylim else None
        self.save_path = save_path
        self.title = title
        self.tight = tight

    def __enter__(self):
        return(self)

    def __exit__(self,exc_type, exc_value, exc_traceback):
        self.option()
        plt.title(self.title)
        plt.tight_layout() if self.tight else None
        if self.save_path:
            plt.savefig(self.save_path)
        plt.show()

    def option(self):
        '''This method is for additional graphic setting. 
        See DatePlot for example.'''
        pass

    def stratified_table(self, table_, log=False, cum=True):
        table_ = table_.copy()
        table_ = table_.cumsum() if cum else table_ 
        if log:
            table_ = table_.replace(0,1)
            table_ = np.log10(table_) 
        table_.plot(ax=self.ax, cmap="tab20") 


class DatePlot(BasicPlot):
    def __init__(self,rotation=90,x_fontsize=10,**kargs):
        super().__init__(**kargs)
        self.rotation = rotation
        self.x_fontsize = x_fontsize

    def option(self):
        self.ax.xaxis.set_major_locator(mdates.DayLocator(bymonthday=None, interval=1, tz=None))
        self.ax.xaxis.set_major_formatter(mdates.DateFormatter("%Y-%m-%d"))
        plt.xticks(rotation=self.rotation,fontsize=self.x_fontsize)

    def cate_bar_plot(self,table_,cols=None):
        table_ = table_.copy()
        cols = table_.columns if cols is None else cols
        table_["sum"] = 0 
        for c in cols:
            self.ax.bar(table_.index, table_[c], bottom=table_["sum"],
                    label=c, width=1, edgecolor="black")
            table_["sum"] += table_[c]
        del table_
        plt.legend()

class MultiPlot():
    def __init__(self, figsize=(8,6), dpi=150,grid=(2,2) ,suptitle="",
            save_path=None,show=True, tight=True):
        self.fig = plt.figure(figsize=figsize,dpi=dpi)
        self.grid = grid
        self.save_path = save_path
        self.show = show
        self.tight = tight

        plt.suptitle(suptitle)

    def set_ax(self,index,xlim=None, ylim=None, xlabel="", ylabel="",title=""):
        """Return axis object. 

        Args: 
            index (int) : index of which axes object is pointed at. 
        """
        ax = self.fig.add_subplot(*self.grid,index)
        ax.set_xlabel(xlabel)
        ax.set_ylabel(ylabel)
        ax.set_xlim(xlim) if xlim else None
        ax.set_ylim(ylim) if ylim else None
        ax.set_title(title)
        return(ax)

    def __enter__(self):
        return(self)

    def __exit__(self,exc_type, exc_value, exc_traceback):
        self.option()
        plt.tight_layout() if self.tight else None
        plt.savefig(self.save_path) if self.save_path else None
        plt.show() if self.show else None

    def option(self):
        """This method is for additional graphic setting. 
        See DatePlot for example."""
        pass

