#!/usr/bin/env bash

echo "Setting up elasticsearch"

wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-0.90.10.tar.gz
tar -zxvf elasticsearch-0.90.10.tar.gz
mv elasticsearch-0.90.10 elasticsearch
chown -R app:app elasticsearch
rm -f elasticsearch-0.90.10.tar.gz

echo "Setting up kibana, installing as elasticsearch plugin"

cd elasticsearch/plugins
mkdir -p kibana

wget https://download.elasticsearch.org/kibana/kibana/kibana-3.0.0milestone4.tar.gz
tar -zxvf kibana-3.0.0milestone4.tar.gz
rm -f kibana-3.0.0milestone4.tar.gz
mv kibana-3.0.0milestone4 _site
