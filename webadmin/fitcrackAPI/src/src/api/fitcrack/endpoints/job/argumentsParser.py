'''
   * Author : see AUTHORS
   * Licence: MIT, see LICENSE
'''


from flask_restplus import reqparse, inputs
from settings import SECONDS_PER_JOB
from src.api.apiConfig import api
from src.api.fitcrack.argumentsParser import pagination

jobList_parser = pagination.copy()
jobList_parser.add_argument('name', type=str, required=False, help='filter by name')
jobList_parser.add_argument('status', type=str, required=False, help='filter by state',
                                choices=['ready', 'finished', 'exhausted', 'malformed', 'timeout', 'running', 'validating', 'finishing'])
jobList_parser.add_argument('attack_mode', type=str, required=False, help='filter by attack type')
jobList_parser.add_argument('order_by', type=str, required=False, help='result ordering',
                                choices=['name', 'time', 'progress', 'attack_mode', 'status'])
jobList_parser.add_argument('descending', type=inputs.boolean, required=False)
jobList_parser.add_argument('showDeleted', type=inputs.boolean, required=False, default=False)
jobList_parser.add_argument('bin', type=int, required=False, default=None)
jobList_parser.add_argument('batch', type=int, required=False, default=None)

jobWorkunit_parser = pagination.copy()

verifyHash_argument = reqparse.RequestParser()
verifyHash_argument.add_argument('hashes', type=str, required=True, help='hash to verify',
                                 default='79c2b46ce2594ecbcb5b73e928345492')
verifyHash_argument.add_argument('hashtype', type=str, required=True,
                                 default='0', help='hash code from /hashcat/hashTypes')

crackingTime_argument = reqparse.RequestParser()
crackingTime_argument.add_argument('hash_type_code', type=str, required=True, help='hash type', default='0')
crackingTime_argument.add_argument('boinc_host_ids', type=str, required=True, help='host IDs')
crackingTime_argument.add_argument('attack_settings', required=True)

addJob_model = api.schema_model('addJob', {
    "required": ["name"],
    'properties': {
        'name': {
            "type": "string",
            "description": "Job name"
        },
        'comment': {
            "type": "string",
            "description": "Optional job comment",
            "default": ''
        },
        'hosts_ids': {
            'description': 'Host IDs from /hosts',
            'type': 'array',
            'items': {
                'type': 'integer',
                'minimum': 0
            }
        },
        'seconds_per_job': {
            "description": "Time (seconds) per one workunit, by default this is " + str(SECONDS_PER_JOB),
            "type": "integer",
            "default": SECONDS_PER_JOB,
            "minimum": 0
        },
        'time_start': {
            "format": "date-time",
            "type": "string",
            "description": "Planned job start time"
        },
        'time_end': {
            "format": "date-time",
            "type": "string",
            "description": "Time limit for cracking"
        },
        'attack_settings': {
            'type': 'object',
            'required': ['attack_mode', 'attack_name'],
            'properties': {
                'attack_mode': {
                    'type': 'integer'
                },
                'attack_name': {
                    'type': 'string'
                },
                'pcfg_grammar': {
                    'description': 'PCFG Grammar',
                    'type': 'object',
                    "properties": {
                        'id': {
                            'type': 'integer'
                        },
                        'keyspace': {
                            'type': 'integer'
                        },
                        'name': {
                            'type': 'string'
                        }
                    },
                },
                'keyspace_limit': {
                    'type': 'integer'
                },
                'left_dictionaries': {
                    'description': 'Array of left dictionaries',
                    'type': 'array',
                    'items': {
                        "type": "object",
                        "properties": {
                            'id': {
                                'type': 'integer'
                            },
                            'keyspace': {
                                'type': 'integer'
                            },
                            'name': {
                                'type': 'string'
                            },
                            'time': {
                                "format": "date-time",
                                "type": "string"
                            },
                        },
                    }
                },
                'right_dictionaries': {
                    'description': 'Array of right dictionaries',
                    'type': 'array',
                    'items': {
                        "type": "object",
                        "properties": {
                            'id': {
                                'type': 'integer'
                            },
                            'keyspace': {
                                'type': 'integer'
                            },
                            'name': {
                                'type': 'string'
                            },
                            'time': {
                                "format": "date-time",
                                "type": "string"
                            },
                        },
                    }
                },
                'rules': {
                    "oneOf": [
                        {"type": "null"},
                        {'type': 'object',
                        'properties': {
                                'id': {
                                    'type': 'integer'
                                },
                                'name': {
                                    'type': 'string'
                                },
                                'time': {
                                    "format": "date-time",
                                    "type": "string"
                                },
                            }
                        }
                    ]
                },
                'rule_left': {
                    'type': 'string'
                },
                'rule_right': {
                    'type': 'string'
                },
                'mask': {
                    'type': 'string'
                },
                'masks': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
                'attack_submode': {
                    'type': ['integer', 'null']
                },
                'markov_treshold': {
                    'type': ['integer', 'null']
                },
                'markov_id': {
                    'type': ['integer', 'null']
                },
                'charset_ids': [{
                    'type': 'array',
                    'items': {
                        'type': 'integer',
                        'minimum': 0
                    }
                }, 'null'],
            }
        },
        'hash_settings':  {
            'type': 'object',
            'required': ['hash_type'],
            'properties': {
                'hash_type': {
                    'default': '0',
                    'type': 'string',
                    'description': 'Hash code from /hashcat/hashTypes'
                },
                'hash_list': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'hash': {
                                'type': 'string',
                                'description': 'hash'
                            }
                        }
                    }
                },
                'valid_only': {
                    'default': False,
                    'type': 'boolean',
                    'description': 'Specifies whether hash validation is enforced'
                }
            }
        }
    },
    'type': 'object'
})

jobList_argument = reqparse.RequestParser()
jobList_argument.add_argument('job_ids', type=list, required=True, location='json')

jobOperation = reqparse.RequestParser()
jobOperation.add_argument('operation', type=str, required=True,  help='job action',
                       choices=["start", "stop", "restart", "kill"])

editHostMapping_argument = reqparse.RequestParser()
editHostMapping_argument.add_argument('newHost_ids', type=list, required=True, location='json')

multiEditHosts_argument = editHostMapping_argument.copy()
multiEditHosts_argument.add_argument('job_ids', type=list, required=True, location='json')

editJob_argument = reqparse.RequestParser()
editJob_argument.add_argument('name', type=str, required=True)
editJob_argument.add_argument('comment', type=str, required=True)
editJob_argument.add_argument('seconds_per_job', type=int, required=True)
editJob_argument.add_argument('time_start', type=str, required=True)
editJob_argument.add_argument('time_end', type=str, required=True)
editJob_argument.add_argument('startNow', type=str, required=True)
editJob_argument.add_argument('endNever', type=str, required=True)
