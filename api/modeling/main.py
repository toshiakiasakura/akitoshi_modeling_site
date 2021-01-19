import numpy as np 
import pandas as pd 
import json
import sys
import os 
from scipy.optimize import minimize

import gne_myopathy

print(os.path.abspath(__file__))
model_path = f"{os.getcwd()}/api/modeling"
df = pd.read_csv(f"{model_path}/muscle_data.csv")
model = gne_myopathy.GNEMyopathyModel(df)
params = json.loads(sys.argv[1])
values = [float(v)/100 for v in params['data']]

model.input_data(values)
res = minimize(fun=gne_myopathy.disease_age_fit,  x0=0, args=(df, values), method="L-BFGS-B")
model.disease_age_vis(res.x[0], save_path=f"{model_path}/test.png", show=False)
