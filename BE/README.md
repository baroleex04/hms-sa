# how to run

Make sure you have Python and PIP

```sh
cd BE
python -m venv .venv # venv name must be ".venv", otherwise gitignore wont work
source ./.venv/bin/activate
pip install -r requirements.txt
python -m flask --app server run
```
