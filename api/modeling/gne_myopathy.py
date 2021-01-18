import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from typing import Union, Optional, List, Dict, Callable, Any, Tuple
from types import ModuleType

from scipy.special import logit, expit
from scipy.stats import norm

import vis_utils 

def disease_age_fit(par: float, df:pd.DataFrame, values ): 
    """DataFrame should be set the following order.
    'knee_flexion', 'ankle_dorsiflex', 'knee_extension', 'grip', 'shoulder_abduction', 'elbow_flexion'
    """
    delta2 = 0.01
    ll = 0
    age = par[0]
    for (i, row), v in  zip(df.iterrows(), values):
        name, theta, beta, sigma = row
        lin = theta + beta*(age)
        mu = expit(lin)
        scale = np.sqrt((sigma*mu)*(sigma*mu) + delta2) 
        rv =  norm(mu, scale=scale)
        ll += rv.logpdf(v)
    nll = - ll
    return(nll)


class GNEMyopathyModel():
    def __init__(self,df):
        self.df = df
        self.t = np.linspace(-40,40, 81)
        delta2 =  0.0001

    def muscle_function(self):
        with vis_utils.BasicPlot(title="Expected Muscle decay as a function of disease age.",
                        ylabel="Proportion Max Strength", xlabel="Disease Age",
                        figsize=(6,4), dpi=150) as p:

            for i ,row in self.df.iterrows():
                name, theta, beta, sigma = row
                lin = theta + beta*(self.t - 0)
                mu = expit(lin)
                p.ax.plot(self.t, mu , label=name)
            plt.legend()
        
    def input_data(self, values: List[float]):
        """values should be set the following order.
        'knee_flexion', 'ankle_dorsiflex', 'knee_extension', 'grip', 'shoulder_abduction', 'elbow_flexion'
        """
        self.values = values 
        
    def disease_age_vis(self, age):
        # set disease age as 0.
        t = np.linspace(-40,40, 81)
        delta2 =  0.0001
        df = self.df
        with vis_utils.BasicPlot(title="Fittingness of disease age",
                                ylabel="Proportion Max Strength", xlabel="Disease Age",
                                figsize=(6,4), dpi=150) as p:
            for (i ,row), v in zip(df.iterrows(), self.values):
                name, theta, beta, sigma = row
                lin = theta + beta*(t - 0)
                mu = expit(lin)
                arg = np.argmin( (mu- v)*(mu-v))
                p.ax.plot(t, mu , label=name)
                p.ax.scatter(t[arg], v)
            p.ax.axvline(age, ymin=0, ymax=1, color="black", alpha=0.5)
            p.ax.text(40, 0.95 ,f"Disease age: {age: .3f} year",  horizontalalignment='right')
            plt.legend()


